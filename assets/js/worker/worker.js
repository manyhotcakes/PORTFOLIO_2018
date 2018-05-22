/* eslint-disable */
const { AES, PBKDF2, enc, mode, pad, lib, MD5 } = require("crypto-js")
import Util from "@/assets/js/util.js"

class Crypt {
  constructor() {
    this.init()
  }

  /**
   * 暗号複合 初期化処理
   * @return {Crypt} 自身
   */
  init() {
    this.config = {
      mode: mode.CBC,
      padding: pad.Pkcs7
    }
    this.enc = enc.Utf8
    return this
  }

  checkPw(_inputpw, _hashedpw) {
    const inputhashed = MD5(_inputpw).toString(enc.Hex)
    return inputhashed === _hashedpw
  }

  /**
   * パスワード設定
   * @return {Crypt} 自身
   */
  getVars() {
    const iv = lib.WordArray.random(128 / 8)
    const salt = lib.WordArray.random(128 / 8)
    return { iv, salt }
  }
  getKey(_pw, _salt) {
    const pw = this.enc.parse(enc.Hex.parse(_pw))
    return PBKDF2(pw, _salt, { keySize: 128 / 8, iterations: 500 })
  }

  /**
   * 暗号化
   * @param  {String} plainText 暗号化を行いたい文字列
   * @return {String}           暗号化データ
   */
  encrypt(_plainText, _pw) {
    const { iv, salt } = this.getVars()
    const key = this.getKey(_pw, salt)
    const encrypt = AES.encrypt(
      this.enc.parse(_plainText),
      key,
      Object.assign(this.config, { iv })
    )
    return [
      enc.Hex.stringify(iv),
      enc.Hex.stringify(salt),
      encrypt.toString(),
      enc.Hex.stringify(key)
    ].join(":")
  }

  /**
   * 複合
   * @param  {String} encrypted 暗号化データ
   * @return {String}           複合した文字列
   */
  decrypt(encryptedData, _pw) {
    /* eslint-disable */
    const [ivStr, saltStr, encryptStr] = encryptedData.split(":")
    const iv = enc.Hex.parse(ivStr)
    const salt = enc.Hex.parse(saltStr)
    // const encrypt = encryptStr
    const key = this.getKey(_pw, salt)
    const decrypted = AES.decrypt(
      encryptStr,
      key,
      Object.assign(this.config, { iv })
    )
    return decrypted.toString(this.enc)
  }
}

const crypt = new Crypt()

onmessage　= (message) => {
  const {key, value, idx} = message.data

  ;(async () => {
    const string = await Util.arrayBufferToString(value)
    const object = JSON.parse(string)
    const {text, pw} = object
    switch (key) {
      case "decrypt":
        Util.webWorkerSend(self, "decrypt", {
          text: crypt.decrypt(text, pw)
        }, false, idx)
        break;
      case "encrypt":
        Util.webWorkerSend(self, "encrypt", {
          text: crypt.encrypt(text, pw)
        }, false, idx)
        break;
      default:
        throw new Error("undefined key name")
    }
  })().catch(err => {
    throw new err
  })
};
