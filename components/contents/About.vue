<style lang="scss" scoped>
.list {
  @include ul;
  margin-left: 1rem;
}
</style>
<template>
  <article class="l-body">
    <section class="intro l-intro">
      人生初のポートフォリオサイトです。はじめに下記を方針として決め、製作に入りました。
      <ul class="list">
        <li>シンプルに伝えるために1ページのサイト構成</li>
        <li>暗号化/複合を行ってコンテンツを提供する</li>
        <li>無料</li>
      </ul>
      デザインの知識は<a-out href="http://amzn.asia/3JWX1iy">ノンデザイナーズ・デザインブック</a-out>程度の知識しかありませんが、自分が好きな幾何学的なモチーフや北欧家具の色合いを取り入れ、<a-out href="https://getbootstrap.com/">BootStrap</a-out>といったフレームワークを用いずに開発しました。
    </section>
    <section class="intro l-intro">
      <h3 class="subtitle"><span>Nuxt.jsを用いて静的サイトの開発を最速に。</span></h3>
      <p class="intro_line">今ホットで僕もお気に入りのフレームワーク<a-out href="https://vuejs.org/" >Vue.js</a-out>から生まれたフレームワーク<a-out href="https://nuxtjs.org/" >Nuxt.js</a-out>を使用。
      ホスティングには<a-out href="https://pages.github.com/" >GitHubPages</a-out>を使用。相性もよく、開発→コンパイル→デプロイの流れもスムーズです。</p>
    </section>
    <section class="intro l-intro">
      <h3 class="subtitle"><span>静的サイトで暗号化コンテンツを提供。</span></h3>
      <p class="intro_line">開発実績となる「Works」には、広く公開すべきではない情報が含まれているため、暗号化を行い提供をしています。
      <a-out href="https://github.com/manyhotcakes/PORTFOLIO_2018" >GitHub上のソース</a-out>を見ていただければ<b>開発実績の文章/画像ともに、平文で記載されている箇所がひとつもない</b>ことをご確認いただけるかと思います。</p>
      <p class="intro_line">暗号化方式は AES-128。フロントエンドで行う復号化は処理時間がかかってしまいますので、 WebWorker を用いてバックグラウンドで並列/非同期処理を行っております。</p>
    </section>
    <section class="intro l-intro">
      <h3 class="subtitle"><span>ITCSS を採用。</span></h3>
      <p class="intro_line">コンポーネント内だけでなくグローバルに使用する CSS は<a-out href="https://itcss.io/">ITCSS</a-out>の記法で記述しています。一部 SMACSS の記法も採用しています。（`l-`など）</p>
    </section>
  </article>
</template>

<script>
/* eslint-disable */
// import mixin from "~/components/mixin/_EncryptComponent.js"
export default {
  name: "About"
}
</script>
