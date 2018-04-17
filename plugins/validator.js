import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja';
import Crypt from '~/assets/crypt.js'

// カスタムルールの宣言
const validations = {
  // パスワード一致チェック
  password: {
    // デフォルトのバリデーションメッセージ
    getMessage(field) {
      return `${field}: password does not match`;
    },
    /**
     * 入力された PW が定義された hash と同一か否か
     * @param  {String} value 入力文字列
     * @param  {String} match 定義されているhash。v-validateの引数値で指定された値
     * @return {Promise}      同一であればresolveでtrue返却
     */
    validate(value, [match]){
      return new Promise((resolve) => {
        const crypt = new Crypt();
        resolve(crypt.checkPw(value, match));
      });
    }
  },
};

// veeValidateの利用開始宣言
Vue.use(VeeValidate, {
  locale: 'ja',
  dictionary: {
    ja,
  }
});

// カスタムルールの追加
_.each(validations, (rule, name) => {
  Validator.extend(name, rule);
});

// 各種バリデートにカスタムメッセージ設定
const dictionary = {
  ja: {
    messages: {
      password: (field) => `${field}が異なります。再度入力してください。`,
      required: (field) => `${field}は必須項目です。入力してください。`,
    }
  }
}
Validator.localize(dictionary);
