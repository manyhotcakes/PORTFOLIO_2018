/* eslint-disable */
export default {
  /**
   * 文字列型をArrayBuffer(Uint16)に変換
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  stringToArrayBuffer(str) {
    return new Uint16Array(
      [].map.call(str, function(c) {
        return c.charCodeAt(0)
      })
    ).buffer
  },
  /**
   * ArrayBuffer(Uint16)を文字列型に変換
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  arrayBufferToString(str) {
    return String.fromCharCode.apply(null, new Uint16Array(str))
  },
  // objectToMap(_obj) {
  //   const map = new Map()
  //   const func = (v, prefix = "") => {
  //     if (_.isPlainObject(v)) {
  //       for (let k of Object.keys(v)) {
  //         func(v[k], prefix ? `${prefix}.${k}` : `${k}`)
  //       }
  //       return map
  //     } else if (_.isArray(v)) {
  //       for (let i = 0; i < v.length; i++) {
  //         // map.set(i, func(v[i], new Map()))
  //         func(v[i], prefix ? `${prefix}.${i}` : `${i}`)
  //       }
  //       return map
  //     } else {
  //       return map.set(`${prefix}`, v)
  //     }
  //   }
  //   const res = func(_obj)
  //   console.log("hogeee", res)
  //   return res
  // },
  /**
   * _obj 中の _path の位置に、 _val を書き込む
   * @param {[type]} _obj  [description]
   * @param {[type]} _path [description]
   * @param {[type]} _val  [description]
   */
  setValWithKeyArray(_obj, _path, _val) {
    var obj = _obj
    const plist = _.isArray(_path) ? _path : _path.split('.')
    for (var i = 0; i < plist.length - 1; i++) {
      const key = plist[i]
      if ( !obj[key] ) {
        obj[key] = {}
      }
      obj = obj[key]
    }
    obj[plist[plist.length - 1]] = _val

    return _obj
  },
  /**
   * webWorker に情報を送る。waitResを設定すると Promise を用いて結果を返却する
   * 実行完了後、workerは終了する
   * @param  {[type]}  worker          [description]
   * @param  {[type]}  key             [description]
   * @param  {[type]}  sendData        [description]
   * @param  {Boolean} [waitRes=false] [description]
   * @param  {Number}  [idx=0]         [description]
   * @return {Promise}                 [description]
   */
  async webWorkerSend(worker, key, sendData, waitRes = false, _idx = 0) {
    var sendtext = ""
    if (_.isObject(sendData)) {
      sendtext = JSON.stringify(sendData)
    } else {
      sendtext = sendData
    }
    const buffer = this.stringToArrayBuffer(sendtext)
    worker.postMessage(
      {
        key,
        value: buffer,
        idx: _idx
      },
      [buffer]
    )

    // 返却をまつときは、Promiseを返却する
    if (waitRes) {
      return new Promise(resolve => {
        // EventHandler を宣言。スコープ内で宣言すること。
        // （さもなくば removeEventListener の EventHandler と一致しなくなる）
        const func = async message => {
          const { value, idx } = message.data
          if (idx !== _idx) {
            return
          }
          const string = this.arrayBufferToString(value)
          const object = JSON.parse(string)
          resolve(object.text)
          worker.removeEventListener("message", func)
        }
        worker.addEventListener("message", func)
        // worker.onmessage = message => {
        //   const { value } = message.data
        //   ;(async () => {
        //     const string = this.arrayBufferToString(value)
        //     const object = JSON.parse(string)
        //     resolve(object.text)
        //     worker.terminate()
        //   })()
        // }
      })
    } else {
      // worker.terminate()
      return
    }
  }
}
