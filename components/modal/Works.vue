<template>
<!-- eslint-disable -->
  <article class="wrap">
    <!-- <h2 class="modaltitle">{{contents.title}}</h2> -->
    <div class="desc" v-text="contents.description"/>
    <div class="l-tworow">
      <dl class="l-tworow_col l-tworow_col-first spec">
        <dt v-if="contents.duration">プロジェクト期間</dt>
        <dd v-if="contents.duration" v-text="contents.duration"/>
        <dt v-if="contents.targetdevice">対象デバイス</dt>
        <dd v-if="contents.targetdevice" v-text="contents.targetdevice"/>
        <dt v-if="contents.team">チーム規模</dt>
        <dd v-if="contents.team" v-text="contents.team"/>
        <dt v-if="contents.position">自身の役割</dt>
        <dd v-if="contents.position">
          <ul class="sublist">
            <li v-for="(item, key) in contents.position" :key="key" v-text="item"/>
          </ul>
        </dd>
        <dt v-if="contents.charge">自身の担当フェーズ</dt>
        <dd v-if="contents.charge" v-text="contents.charge"/>
        <dt v-if="contents.technique">技術要素</dt>
        <dd v-if="contents.technique">
          <ul class="sublist">
            <li v-for="(item, key) in contents.technique" :key="key" v-text="item"/>
          </ul>
        </dd>
        <dt v-if="contents.site">サイト</dt>
        <dd v-if="contents.site">
          <ul class="sublist">
            <li v-for="(item, key) in contents.site" :key="key">
              <a :href="item.url" v-text="item.title" target="_blank" rel="noopener noreferrer"/>
            </li>
          </ul>
        </dd>
      </dl>
      <!-- 画像 -->
      <section class="l-tworow_col l-tworow_col-second l-imagelist">
        <squareimage v-for="(item, idx) in contents.images" :key="idx"
                     :src="item.image" :title="item.title"
                     imageType="CryptImageWithLb"
                     class="l-imagelist_item"/>
      </section>
      <!-- /画像 -->
    </div>
    <section v-if="contents.particular" class="particular">
      <h3>こだわり</h3>
      <div class="sublist">
        <div v-for="(item, key) in contents.particular" :key="key">
          <h4 class="particular_title" v-text="item.title"/>
          <div>
            <p v-for="(item_c, key_c) in item.body" :key="key_c" v-html="item_c" class="particular_body"/>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.wrap {
  text-align: left;
}
.desc {
  font-size: 1rem;
  margin: $sz-line-section 0 $sz-contents-section;
}
.l-tworow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: $sz-line-section;
  &_col {
    &-first {
      // PC:左側 SP:下側
      flex: 0 0 30%;
      padding-right: $sz-line-section;
      @include smartphones() {
        padding-right: 0;
      }
    }
    &-second {
      // PC:右側 SP:上側
      flex: 0 0 70%;
      padding-left: $sz-line-section;
      @include smartphones() {
        margin-bottom: $sz-group-section;
        padding-left: 0;
      }
    }
  }
  @include smartphones() {
    flex-direction: column-reverse;
    flex-wrap: nowrap;
  }
}
.spec {
  font-size: 1rem;
  word-break: break-all;
  & > dt {
    @extend %h3;
    margin: $sz-line-section 0 ($sz-line-section/2);
    &:first-child {
      margin-top: 0;
    }
  }
  & > dd {
    padding-left: $sz-group-section;
  }
}
.sublist {
  list-style: circle;
  padding-left: 1rem;
  & > li {
    margin: 4px 0;
    padding: 0;
  }
}
.particular {
  &_title {
    margin: $sz-line-section 0 ($sz-line-section/2) 0;
  }
  &_body {
    white-space: pre-wrap;
    margin-top: ($sz-line-section/2);
    text-indent: 1rem;
    padding-left: 1rem;
    line-height: 1.4rem;
    &:first-child {
      margin-top: 0;
    }
    & /deep/ b {
      font-weight: bold;
      color: $color1;
    }
  }
}
</style>

<script>
/* eslint-disable */
import Squareimage from "~/components/contents/Squareimage.vue"
// import CryptImageWithLb from "~/components/contents/CryptImageWithLb.vue"

export default {
  name: "Works",
  components: {Squareimage},
  props: {
    contents: {
      type: [Object],
      required: true
    }
  },
  data: function() {
    return {
    }
  },
  mounted: function() {
    // const {visible} = this.$store.getters["window/getModalData"]
  },
  watch: {

  },
  computed: {
  }
}
</script>
