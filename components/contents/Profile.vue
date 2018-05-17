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
    transform: scale(1.1);
    transform-origin: center;
    &:before {
      content: "";
      display: block;
      padding-top: 2 / 3 * 100%;
    }
  }
  &_left {
    top: 0;
    left: 0;
    width: 50%;
    transform-origin: left top;
    & > img {
      transform-origin: left top;
      filter: sepia(1) hue-rotate(70deg) brightness(0.9) blur(2px);
    }
  }
  &_right {
    right: 0;
    bottom: 0;
    width: 50%;
    transform-origin: right bottom;
    & > img {
      transform-origin: right bottom;
      filter: sepia(1) hue-rotate(-10deg) brightness(0.9) blur(2px);
    }
  }
  &_left,
  &_right {
    position: absolute;
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
      transform: scale(2);
      object-fit: contain;
    }
  }
  &_center {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    transform-origin: center;
    transform: skewX(-56deg);
    & > img {
      transform-origin: center;
      transform: skewX(56deg);
      width: 100%;
      filter: grayscale(1);
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
  font-family: Raleway;
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
        <div class="topimage_left">
          <img src="profile_01.jpg">
        </div>
        <div class="topimage_right">
          <img src="profile_01.jpg">
        </div>
        <div class="topimage_center">
          <img src="profile_01.jpg">
        </div>
      </div>
      <!-- <img class="topimage_right" src="profile_01.jpg"> -->
    </div>
    <h2 class="l-name name">岡本 拓也<span class="name_sub">(OKAMOTO Takuya)</span></h2>
    <ul class="l-position position">
      <li class="position_item position_item-prime">フロントエンドエンジニア</li>
      <li class="position_item position_item-prime">サーバサイドエンジニア</li>
      <li class="position_item">Osaka, Japan</li>
    </ul>
    <div class="intro l-intro">
      <p class="intro_line">1988年兵庫県生まれ。関西学院大学卒業後、石川県のゲーム会社にゲームプログラマーの経験した後、大阪府のウェブ会社に Web エンジニアとして転職しました。
      サービス開発に携わるなかで、バックエンド、フロントエンド、インフラ領域の開発を経験しました。
      その後、<a-out href="https://www.fenrir-inc.com/">フェンリル株式会社</a-out>に転職。 Web エンジニアとして経験したのち、プロジェクトのマネジメントを任され、開発案件/保守案件と複数の案件に従事しました。</p>
      <p class="intro_line">柔軟性こそ正義。思い込みを避け、あらゆる可能性を考え、ソリューションを提供することが大事と考えています。</p>
    </div>
    <section class="intro l-intro">
      <h3 class="subtitle"><span>PM,PL,SE,PG の経験から導き出されたバランス感覚が強み。</span></h3>
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
