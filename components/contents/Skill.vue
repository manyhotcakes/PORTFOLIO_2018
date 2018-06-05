<style lang="scss" scoped>
.l-skill {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  &_block {
    flex: 0 0 calc(50% - 0.2rem / 2);
    &-head {
      padding-bottom: $sz-line-section;
    }
    &-center {
      flex: 0 0 0.2rem;
      background: $background-color;
    }
  }
}
.notice {
  @include h2;
  font-family: Railway;
  text-align: center;
  margin: auto;
  padding-bottom: $sz-line-section;
}
.skill_wrap {
  width: 100%;
  margin-bottom: 0.5rem;
  &:last-child {
    margin-bottom: 0;
  }
  &_item {
    width: 100%;
    &-bar {
      position: relative;
      height: 2rem;
    }
  }
}
.skill_bar {
  position: absolute;
  height: 100%;
  bottom: 0;
  border: solid 0.5px #fff;
}
.skill_name {
  @include h4;
  white-space: nowrap;
  padding-top: 0.5rem;
  margin: auto;
}
.skill_score {
  white-space: nowrap;
  color: white;
  line-height: 2rem;
  font-size: 1.5rem;
  vertical-align: middle;
  width: 100%;
}
.skill {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: Railway;
  &-right {
    align-items: flex-start;
    padding-left: 0.5rem;
    & .skill_bar {
      border-radius: 0 4px 4px 0;
      left: 0;
      background: $color3;
    }
    & .skill_name {
      text-align: left;
    }
    & .skill_score {
      text-align: left;
      padding-left: 0.1rem;
    }
  }
  &-left {
    align-items: flex-end;
    padding-right: 0.5rem;
    & .skill_bar {
      border-radius: 4px 0 0 4px;
      right: 0;
      background: $color1;
    }
    & .skill_name {
      text-align: right;
    }
    & .skill_score {
      text-align: right;
      padding-right: 0.1rem;
    }
  }
}
</style>
<template>
  <article class="l-body">
    <!-- ヘッダ部 -->
    <head class="l-skill">
      <div class="l-skill_block l-skill_block-head">
        <div class="notice">FrontEnd Skill</div>
        <div class="scoregage_gage"/>
      </div>
      <div class="l-skill_block l-skill_block-center"/>
      <div class="l-skill_block l-skill_block-head">
        <div class="notice">BackEnd Skill</div>
        <div class="scoregage_gage"/>
      </div>
    </head>
    <!-- /ヘッダ部 -->
    <section class="l-skill">
      <div class="l-skill_block skill skill-left">
        <div v-for="(v, k) in topics1" :key="k" class="skill_wrap">
          <div class="skill_wrap_item">
            <div class="skill_name" v-html="v.name"/>
          </div>
          <div class="skill_wrap_item-bar">
            <div :style="getBarStyle(v.score)" class="skill_bar">
              <div class="skill_score" v-html="v.score"/>
            </div>
          </div>
        </div>
      </div>
      <div class="l-skill_block l-skill_block-center"/>
      <div class="l-skill_block l-skill skill skill-right">
        <div v-for="(v, k) in topics2" :key="k" class="skill_wrap">
          <div class="skill_wrap_item">
            <div class="skill_name" v-html="v.name"/>
          </div>
          <div class="skill_wrap_item-bar">
            <div :style="getBarStyle(v.score)" class="skill_bar">
              <div class="skill_score" v-html="v.score"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: "Skill",
  data() {
    return {
      topics1: [
        { name: "JavaScript(ES2015-)", score: 100 },
        { name: "HTML5", score: 100 },
        { name: "CSS3/SCSS", score: 100 },
        { name: "jQuery", score: 100 },
        { name: "Vue.js", score: 80 },
        { name: "Nuxt.js", score: 70 },
        { name: "AngularJS", score: 70 },
        { name: "SVG", score: 50 },
        { name: "gulp.js", score: 50 },
        { name: "webpack", score: 40 },
        { name: "CoffeeScript", score: 30 },
        { name: "Angular", score: 20 }
      ],
      topics2: [
        { name: "MySQL", score: 100 },
        { name: "Linux/Bash", score: 90 },
        { name: "PHP", score: 80 },
        { name: "Lua", score: 70 },
        { name: "Laravel", score: 60 },
        { name: "NoSQL", score: 60 },
        { name: "Nginx/Apache", score: 50 },
        { name: "AWS", score: 30 },
        { name: "Selenium WebDriver", score: 30 },
        { name: "Solr", score: 15 },
        { name: "Ruby on Rails", score: 10 },
        { name: "C/C++", score: 10 }
      ]
    }
  },
  methods: {
    getBarStyle(_val) {
      return {
        width: `${_val}%`
      }
    }
  }
}
</script>
