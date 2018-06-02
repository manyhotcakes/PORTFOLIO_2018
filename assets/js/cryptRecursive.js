import Util from "./util.js"
import execIgnoreList from "./execIgnoreList.js"
;("use strict")

const WORKER_MAXNUM = parseInt(process.env.WORKER_MAXNUM, 10)

export default class CryptRecursive {
  /**
   * [constructor description]
   * @param {string} _name [description]
   * @param {string} _pw   [description]
   * @param {string} _mode ["decrypt", "encrypt"]
   * @param {string} _exec ["webworker", "inline"]
   */
  constructor(_name, _pw, _mode, _exec) {
    // const worker = new Worker
    this.name = _name
    this.pw = _pw
    if (["decrypt", "encrypt"].indexOf(_mode) < 0) {
      throw new Error("not match mode")
    }
    if (["webworker", "inline"].indexOf(_exec) < 0) {
      throw new Error("not match exec")
    }
    this.mode = _mode
    this.exec = _exec
    this.execIgnoreList = execIgnoreList(_name)
    this.count = 0
    return this
  }
  setOnProcesingCallback(_cb) {
    this.onProcessing = _cb
    return this
  }
  setWorkerInstance(_worker) {
    this.worker = _worker
    return this
  }
  setCryptInstance(_instance) {
    this.crypt = _instance
    return this
  }
  async mapValuesDeep(v) {
    this.keystack = []
    this.idx = 0
    this.stack = []

    // 引数値のオリジナルを保存
    var org = _.cloneDeep(v)
    // 再帰処理開始
    await this.mapValuesDeepRecursive(org, undefined, [], org)

    // スタックが残ったままなら処理を行う
    if (this.stack.length > 0) {
      org = await this.batchPromise(org, this.stack, this.keystack)
    }
    return org
  }
  /**
   * 再帰関数本体
   * @param  {[type]}  v          探索対象
   * @param  {[type]}  key        v のキー名(ex: hoge2)
   * @param  {[type]}  currentkey 再帰関数呼び出し箇所までの v のキー名（ex: body.hoge.2.hoge2）
   * @param  {[type]}  org        オリジナルの引数値 v 全体
   * @return {Promise}            処理完了後、結果が返却される Promise
   */
  async mapValuesDeepRecursive(v, key, currentkey, org) {
    if (typeof key !== "undefined") {
      currentkey.push(key)
    }
    // 配列、オブジェクトであれば再帰
    if (_.isPlainObject(v)) {
      for (let k of Object.keys(v)) {
        await this.mapValuesDeepRecursive(v[k], k, _.clone(currentkey), org)
      }
      return v
    } else if (_.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        await this.mapValuesDeepRecursive(v[i], i, _.clone(currentkey), org)
      }
      return v
    } else {
      // 復号化対象かどうかの確認
      if (this.isExecTarget(currentkey)) {
        this.stack.push(
          // 復号化するものは promise だけ予約して、スタックに積む
          (() => {
            switch (this.exec) {
              case "webworker":
                return this.webWorkExec(v)
              case "inline":
                return this.inlineExec(v)
            }
          })()
        )
        // 上記のリストの値に対応する、キーリストにも追加
        this.keystack.push(_.clone(currentkey))
        return this.execPostFunc(org)
      } else {
        return new Promise(resolve => resolve(v))
      }
    }
  }
  /**
   * Promise が格納されている箇所を、resolveの結果と入れ替える
   * @param  {[type]}  org      [description]
   * @param  {[type]}  stack    [description]
   * @param  {[type]}  keystack [description]
   * @return {Promise}          [description]
   */
  async batchPromise(org, stack, keystack) {
    const result = await Promise.all(stack)
    result.forEach((_v, _k) => {
      org = Util.setValWithKeyArray(org, keystack[_k], _v)
    })
    _.remove(stack)
    _.remove(keystack)
    return org
  }
  /**
   * webWorker で暗号化・複合処理を行う場合の関数
   * @param  {[type]}  v [description]
   * @return {Promise}   [description]
   */
  async webWorkExec(v) {
    return Util.webWorkerSend(
      this.worker,
      this.mode,
      {
        text: v,
        pw: this.pw
      },
      true,
      `${this.name}${this.idx++}`
    )
  }
  /**
   * 直接関数内で暗号化・複合処理を行う場合の関数
   * @param  {[type]}  v [description]
   * @return {Promise}   [description]
   */
  async inlineExec(v) {
    return new Promise(resolve => {
      resolve(this.crypt[this.mode](v, this.pw))
    })
  }
  /**
   * 暗号化・複合 本処理を実行後に実行する関数
   * @param  {[type]}  org [description]
   * @return {Promise}     [description]
   */
  /* eslint-disable no-unused-vars */
  async execPostFunc(org) {
    // ある一定量スタックに貯まれば、処理完了まで待機させる
    if (this.stack.length > WORKER_MAXNUM) {
      org = await this.batchPromise(org, this.stack, this.keystack)
    }

    // ダミーのプロミス。呼び出しと同時に完了
    return new Promise(resolve => resolve()).then(() => {
      // 現在の読み込み進捗度の更新
      if (_.isFunction(this.onProcessing)) {
        this.onProcessing(this.idx)
      }
    })
  }
  isExecTarget(currentkey) {
    const currendkeyjoined = currentkey.join(".")
    return !_.find(this.execIgnoreList, reg => reg.test(currendkeyjoined))
  }
  getProcessingMax(_obj) {
    let obj = _.cloneDeep(_obj)
    const func = function(_v, _cb = () => {}, _k = []) {
      if (_.isPlainObject(_v)) {
        for (let k of Object.keys(_v)) {
          _v[k] = func(_v[k], _cb, Util.arrPush(_k, k))
        }
      } else if (_.isArray(_v)) {
        for (let i = 0; i < _v.length; i++) {
          _v[i] = func(_v[i], _cb, Util.arrPush(_k, i))
        }
      } else {
        _v = _cb(_v, _k)
      }
      return _v
    }
    let count = 0
    func(obj, (_v, _k) => {
      if (this.isExecTarget(_k)) {
        count++
      }
    })
    return count
  }
}
