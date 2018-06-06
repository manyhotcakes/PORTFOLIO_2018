/* eslint-disable */
import idb from "idb"

class PortfolioDB {
  constructor($moment) {
    this.dbName = "portfolio"
    this.dbOSName = "imagelist"
    this.dbPromise = this.init()
    this.$moment = $moment
  }
  init() {
    try {
      return idb.open(this.dbName, 1, db => {
        if (!db.objectStoreNames.contains(this.dbObjectName)) {
          var storeOS = db.createObjectStore(this.dbOSName,
            {keyPath: 'path'});
        }
      })
      // 成功時
      .then(db => {
        this.expireCheck()
        return new Promise(resolve => resolve(db))
      })
      // 失敗時
      .catch(err => {
        console.error("db open error", err);
      })
    } catch(e) {
      throw e
    }
  }
  expireCheck() {
    if (!this.dbPromise) {
      return false
    }
    return this.dbPromise.then(db => {
      var tx = db.transaction(this.dbOSName, "readonly");
      var store = tx.objectStore(this.dbOSName);
      return store.getAll()
    }).then((_val) => {
      _val.forEach(one => {
        if (!one.expire || this.$moment().isAfter(one.expire)) {
          console.log(`expired ${one.path} at ${one.expire}`)
          this.delete(one.path)
        }
      })
      return new Promise(resolve => resolve(_val))
    })
  }
  add(_path, _value) {
    if (!this.dbPromise) {
      return false
    }
    return this.dbPromise.then(db => {
      var tx = db.transaction(this.dbOSName, "readwrite");
      var store = tx.objectStore(this.dbOSName);
      var item = {
        path: _path,
        expire: this.$moment().add(process.env.ENCRYPTIMAGECACHE_EXPIRE, "s").toISOString(),
        base64: _value
      }
      store.add(item)
      return tx.complete
    }).then((_val) => {
      return new Promise(resolve => resolve(_val))
    })
  }
  get(_path) {
    if (!this.dbPromise) {
      return false
    }
    return this.dbPromise.then(db => {
      var tx = db.transaction(this.dbOSName, "readonly");
      var store = tx.objectStore(this.dbOSName);
      return store.get(_path)
    }).then((_val) => {
      return new Promise(resolve => resolve(_val))
    })
  }
  delete(_path) {
    if (!this.dbPromise) {
      return false
    }
    return this.dbPromise.then(db => {
      var tx = db.transaction(this.dbOSName, "readwrite");
      var store = tx.objectStore(this.dbOSName);
      store.delete(_path)
      return tx.complete
    })
  }
}

export default function(ctx, inject) {
  // PortfolioDB のグローバルインスタンス化
  const portfolioDB = new PortfolioDB(ctx.$moment)
  // ctx.$portfolioDB = portfolioDB
  inject("portfolioDB", portfolioDB)
}
