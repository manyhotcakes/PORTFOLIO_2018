<style lang="scss" scoped>
.body{
  height: 10rem;
}
.subtitle{
  font-size: 1rem;
  line-height: 2rem;
  vertical-align: middle;
  height: 2rem;
}
.input{
  padding: 10px;
  border: solid 1px rgba(0,0,0,0.3);
  border-radius: 30px;
  width: 40%;
  min-width: 300px;
  max-width: 600px;
  text-align: center;
  outline: 0;
  &::placeholder{
    color: rgba(0,0,0,0.5);
  }
  &.isError{
    border-color: red;
    box-shadow: 0 0 10px red;
    &::placeholder{
      color: red;
    }
  }
}
</style>
<template>
  <div class="body">
    <form @submit.prevent="onSubmit">
      <i class="fas fa-lock icon-l"></i>
      <p class="subtitle">confidential</p>
      <input
        class="input"
        name="password"
        type="password"
        data-vv-as="パスワード"
        value=""
        :class="inputClass"
        :placeholder="placeholder"
        v-model="password"
        v-validate="validate"
        data-vv-validate-on="none"
      >
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      /**
       * password input フィールドの内容
       * @type {String}
       */
      password: '',
      /**
       * バリデーション時に表示するエラーメッセージ
       * @type {String}
       */
      errormsg: '',
    };
  },
  methods: {
    /**
     * パスワード入力フォームをsubmit時に呼び出される。
     * このタイミングでバリデーションも実行する
     * @return {null}
     */
    onSubmit(){
      // バリデーション実行
      this.$validator.validateAll().then((result) => {
        // 成功時
        if (result) {
          this.$emit('authentication', {password: this.password});
          this.errormsg = '';
          return;
        }
        // バリデーションにひっかかった時
        this.password = '';
        this.errormsg = this.errors.first('password');
      })
    },
  },
  computed: {
    /**
     * input フィールドに設定する class を返却。
     * バリデーションエラーがあれば、赤色に表示する
     * @return {[Array]}
     */
    inputClass(){
      const list = [];
      if (this.errormsg){
        list.push('isError');
      }
      return list;
    },
    /**
     * Placeholder に表示する値を返却
     * @return {String}
     */
    placeholder(){
      return this.errormsg || 'パスワードを入力して非表示を解除';
    },
    /**
     * input に validate する項目を指定
     * @return {String} v-validate に渡す値
     */
    validate(){
      return `password:${process.env.PASSWORDHASH}|required`;
    }
  }
}
</script>
