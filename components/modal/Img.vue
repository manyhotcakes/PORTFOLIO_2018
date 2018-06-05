<template>
<!-- eslint-disable -->
  <article class="wrap">
    <h2 class="modaltitle">{{contents.title}}</h2>
    <div class="desc">
      ベネッセポータルサイト内の教室検索サービス。2016年からCMSのシステム刷新と運用保守を担当。
    </div>
    <div class="l-tworow">
      <dl class="l-tworow_col l-tworow_col-left spec">
        <dt>期間</dt>
        <dd>hogehoge~hogehoge</dd>
        <dt>役割</dt>
        <dd>hogehoge~hogehogehogehoge~hogehoge</dd>
        <dt>チーム規模</dt>
        <dd>hogehoge~hogehoge</dd>
        <dt>担当フェーズ</dt>
        <dd>hogehoge~hogehoge</dd>
        <dt>技術要素</dt>
        <dd>
          <ul class="sublist">
            <li>Ruby on Rails</li>
            <li>Ruby on Rails</li>
            <li>Ruby on Rails</li>
          </ul>
        </dd>
        <dt>参考</dt>
        <dd>https://~~~~</dd>
      </dl>
      <div class="l-tworow_col l-tworow_col-right l-imagelist">
        <squareimage v-for="(item, key) in items" :key="key"
                     :src="item.squareimage" :title="item.title"
                     class="l-imagelist_item l-imagelist_item-3separate"/>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.wrap {
  text-align: left;
}
.modaltitle {
}
.desc {
  font-size: 0.5rem;
  margin: 10px 0 40px;
}
.l-tworow {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  &_col {
    &-left {
      flex: 0 0 30%;
      padding-right: 10px;
    }
    &-right {
      flex: 0 0 70%;
      // border-left: 0.5px solid #aaa;
      padding-left: 10px;
    }
  }
}
.spec {
  font-size: 0.5rem;
  word-break: break-all;
  & > dt {
    margin-top: 10px;
    font-weight: bold;
    &:first-child {
      margin-top: 0;
    }
  }
  & > dd {
    padding-left: 20px;
  }
}
.sublist {
  list-style: circle;
  padding-left: 1em;
  & > li {
    margin: 4px 0;
    padding: 0;
  }
}
</style>

<script>
/* eslint-disable */
import Squareimage from "~/components/contents/Squareimage.vue"

export default {
  name: "Works",
  components: {Squareimage},
  props: {
    contents: {
      type: [String,Object],
      required: true
    }
  },
  data: function() {
    return {
      items: {
        "01": {
          title: "",
          squareimage: "data/img/ss01_01.json"
        },
        "02": {
          title: "",
          squareimage: "data/img/ss01_02.json",
        },
        "03": {
          title: "",
          squareimage: "data/img/ss01_03.json",
        },
        "04": {
          title: "",
          squareimage: "data/img/ss01_04.json",
        },
        "05": {
          title: "",
          squareimage: "data/img/ss01_05.json"
        },
      }
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
