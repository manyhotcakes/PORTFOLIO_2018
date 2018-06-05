<style lang="scss" scoped>
.l-topimage {
  width: 100%;
  height: auto;
  margin-bottom: $sz-contents-section;
}
.l-name {
  // margin-bottom: $sz-group-section;
}
.l-position {
  margin-bottom: $sz-contents-section;
}
.topimage {
  position: relative;
  user-select: none;
  overflow: hidden;
  &_overflow {
    &:before {
      content: "";
      display: block;
      padding-top: 2 / 3 * 100%;
    }
  }
  &_center {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  &_ribbon {
    width: 20vw;
    height: 130%;
    position: absolute;
    transform-origin: center;
    transform: rotate(-12.5deg);
    background: red;
    z-index: 1;
    &-left {
      left: calc(-20vw * #{$slashcos});
      top: -1vw;
      transform-origin: right top;
      background: $color2;
    }
    &-right {
      right: calc(-20vw * #{$slashcos});
      bottom: -1vw;
      transform-origin: left bottom;
      background: $color2;
    }
  }
}
.name {
  @include h2;
  &_sub {
    font-family: Raleway;
    margin-left: 0.5rem;
    font-weight: normal;
    @include smartphones() {
      display: block;
      font-size: 2rem;
    }
  }
}
.position {
  list-style: none;
  font-size: 1rem;
  font-family: Raleway, $default-font;
  @include smartphones() {
    border-left: 1px solid black;
    padding-left: 1rem;
  }
  &_item {
    display: inline-block;
    @include smartphones() {
      display: block;
    }
    &-prime {
      font-weight: bold;
    }
    &:not(:last-child) {
      &:after {
        margin: 0 1rem;
        border-left: solid 1px black;
        content: "";
        @include smartphones() {
          border-left: none;
        }
      }
    }
  }
}
.topic {
  @include ul;
}
</style>
<template>
  <article class="l-body">
    <div class="l-topimage topimage">
      <div class="topimage_overflow">
        <div class="topimage_ribbon topimage_ribbon-left"/>
        <div class="topimage_ribbon topimage_ribbon-right"/>
        <img class="topimage_center" src="profile_01.jpg">
      </div>
    </div>
    <h2 class="l-name name">岡本 拓也<span class="name_sub">(OKAMOTO Takuya)</span></h2>
    <ul class="l-position position">
      <li class="position_item position_item-prime">フロントエンドエンジニア</li>
      <li class="position_item position_item-prime">サーバサイドエンジニア</li>
      <li class="position_item">Osaka, Japan</li>
    </ul>
    <div class="intro l-intro">
      <p class="intro_line">1988年兵庫県生まれ。関西学院大学卒業後、石川県のゲーム会社へゲームプログラマーとして就職しました。その後大阪府のウェブ会社に Web エンジニアとして転職。
      サービス開発に携わるなかで、バックエンド、フロントエンド、インフラ領域の開発を経験しました。
      数年の経験の後、さらにスキルを伸ばすべく顧客との折衝領域が存在する Web サイト受託開発企業に転職。 いくつかの案件でフロントエンジニアを経験したのち、プロジェクトのマネジメントを任され、開発案件/保守案件と複数の案件に従事しました。</p>
      <p class="intro_line">柔軟性こそ正義。思い込みを避け、あらゆる可能性を考え、ソリューションを提供することが大事と考えています。</p>
    </div>
    <section class="intro l-intro">
      <h3 class="subtitle"><span>PM,PL,SE,PG の経験から導き出すバランス感覚が強み。</span></h3>
      <ul class="topic">
        <li v-for="(item, key) in topics1" :key="key" v-html="item"/>
      </ul>
    </section>
    <section class="intro l-intro">
      <h3 class="subtitle"><span>特色ある開発経験。</span></h3>
      <ul class="topic">
        <li v-for="(item, key) in topics2" :key="key" v-html="item"/>
      </ul>
    </section>
  </article>
</template>

<script>
/* eslint-disable */
// import mixin from "~/components/mixin/_EncryptComponent.js"
export default {
  name: "Profile",
  // mixins: [mixin],
  data: function() {
    return {
      topics1: [
        "ウォーターフォール型開発における全領域と、それ以降の運用/保守の経験",
        "多くの一般ユーザ向けサイトの構築/保守案件に開発者/PMそれぞれの立場から従事",
        "PM としてプロジェクト期間約3ヶ月の短期案件から約1年の案件中長期案件まで携わる",
        "新規案件受注活動として、営業同行しヒアリング・企画プレゼン・見積もりなどの経験",
        "客先との MTG 中にコーディングを行い要件定義を進ませる"
      ],
      topics2: [
        "月間数十億 PV 以上のコンテンツ配信サービスにおける設計/開発",
        "iOS 向け課金対応アプリの API 開発",
        "Nginx を用いた巨大ファイル向け CDN 開発",
        "SVG を駆使した高解像度の印刷物生成サイト設計/開発",
        "GPGPU を用いたリアルタイムレイトレーシングの開発"
      ]
    }
  }
}
</script>
