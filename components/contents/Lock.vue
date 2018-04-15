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
// .indicator{
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   @include indicatorSize(4rem, 4rem)
//   &.colorbg-color1{
//     @include indicatorColor(white, $color1);
//   }
//   &.colorbg-color2{
//     @include indicatorColor(white, $color2);
//   }
// }

</style>
<template>
  <div class="body">
    <form v-on:submit.prevent="onSubmit" v-if="!loading">
      <i class="fas fa-lock icon-l"></i>
      <p class="subtitle">confidential</p>
      <input class="input" type="password" value="" :class="inputClass" :placeholder="placeholder" v-model="password">
    </form>
    <!-- <div class="indicator isLoading" :class="indicatorClass" v-if="loading"/> -->
  </div>
</template>

<script>
export default {
  // props:[
  //   'color',
  // ],
  props: [
    'errormsg'
  ],
  data(){
    return {
      password: '',
      // loading: false,
    };
  },
  methods: {
    onSubmit(){
      // this.loading = true;
      this.$emit('authentication', {password: this.password});
    },
  },
  computed: {
    inputClass(){
      const list = [];
      if (this.errormsg){
        list.push('isError');
      }
      return list;
    },
    placeholder(){
      return this.errormsg || 'PWを入力して非表示を解除';
    }
  }
}
</script>
