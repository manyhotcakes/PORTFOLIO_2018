<template>
  <div v-html="body"/>
</template>

<script>
// import template from '~/static/data/dummytemplate.html';
import _ from 'lodash';
import axios from 'axios'
import Crypt from '~/assets/crypt.js'

export default {
  data: function(){
    return {
      level: 3,
      body: '',
    }
  },
  mounted(){
    (async () => {
      const api = axios.create({
        timeout: 3000,
        baseURL: process.env.JSONDATAPATH,
      });
      const { data: {body} } = await api.get('dummytemplate.json');

      const crypt = new Crypt();
      const encrypt = crypt.encrypt('こんにちは<h1>さようですね</h1>', 'hogehoge')
      const decrypt = crypt.decrypt(encrypt, 'hogehoge');

      this.body = body;
    })();
  },
}
</script>
