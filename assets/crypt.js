import _ from 'lodash';
import {AES, PBKDF2, enc, mode, pad, lib} from 'crypto-js'
import crypto from 'crypto-js'

export default class Crypt {
  constructor() {
    this.init();
  }

  /**
   * 暗号複合 初期化処理
   * @return {Crypt} 自身
   */
  init() {
    // var key = Enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
    this.config = {
      mode: mode.CBC,
      padding: pad.Pkcs7
    };
    this.enc = enc.Utf8;
    return this;
  }

  /**
   * パスワード設定
   * @return {Crypt} 自身
   */
  getVars() {
    const iv = lib.WordArray.random(128 / 8);
    const salt = lib.WordArray.random(128 / 8);
    return {iv, salt};
  }
  getKey(_pw, _salt) {
    const pw = this.enc.parse(enc.Hex.parse(_pw));
    return PBKDF2(pw, _salt, {keySize: 128 / 8, iterations: 500 });
  }

  /**
   * 暗号化
   * @param  {String} plainText 暗号化を行いたい文字列
   * @return {String}           暗号化データ
   */
  encrypt(_plainText, _pw) {
    const {iv, salt} = this.getVars();
    const key = this.getKey(_pw, salt);
    const encrypt = AES.encrypt(this.enc.parse(_plainText), key, Object.assign(this.config,{iv}) );
    return [
      enc.Hex.stringify(iv),
      enc.Hex.stringify(salt),
      encrypt.toString(),
      enc.Hex.stringify(key),
    ].join(':');
  }

  /**
   * 複合
   * @param  {String} encrypted 暗号化データ
   * @return {String}           複合した文字列
   */
  decrypt(encryptedData, _pw) {
    const [ivStr, saltStr, encryptStr] = encryptedData.split(':');
    const iv = enc.Hex.parse(ivStr);
    const salt = enc.Hex.parse(saltStr);
    const encrypt = encryptStr;
    const key = this.getKey(_pw, salt);
    const decrypted = AES.decrypt(encrypt, key, Object.assign(this.config,{iv}) );
    return decrypted.toString(this.enc);
  }


}
