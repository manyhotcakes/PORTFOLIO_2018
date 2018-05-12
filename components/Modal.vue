<template>
<!-- eslint-disable -->
  <div class="wrap">
    <div class="modal" :class="modalClass" :style="{ top: posy }" @open="show">
      <div class="modal_head">
        <div class="modal_head_close" @click="close">
          <i class="far fa-times-circle"></i>
        </div>
      </div>
      <component :is="type" :contents="contents" class="modal_body" />
      <div class="modal_foot">
      </div>
    </div>
    <div class="background" :class="modalClass" @click="close">
    </div>
  </div>
</template>

<style lang="scss" scoped>
$time: 0.4s;
.modal {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 80%;
  height: auto;
  max-width: 864px;
  background-color: white;
  border-radius: 10px;
  z-index: 100;
  overflow: hidden;
  opacity: 1;
  visibility: visible;
  padding: 0.3rem;
  transition: opacity $time ease-out, visibility 0s ease-out;
  &_head {
    position: relative;
    height: 20px;
    &_close {
      position: absolute;
      right: 0;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1rem;
      height: 1rem;
      width: 1rem;
      vertical-align: middle;
      color: #444;
    }
  }
  &_body {
    min-height: 300px;
  }
  &_foot {
    height: 20px;
  }

  &.isHide {
    opacity: 0;
    transform: translate(-50%, 20vh);
    visibility: hidden;
  }
}
.background {
  background: rgba($background-modal-color, 0.5);
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  opacity: 1;
  visibility: visible;
  transition: opacity $time ease-out, visibility 0s ease-out;
  &.isHide {
    opacity: 0;
    visibility: hidden;
  }
}
</style>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'

export default {
  components: {
    Works: () => import("~/components/modal/Works.vue")
  },
  props: {
    contentKey: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      visible: false,
      newval: {},
      mounted: false
    }
  },
  mounted: function() {
    console.log("contentKey", this.contentKey)
    this.mounted = true;
    // this.$watch(() => {
    //   const hoge = this.$store.getters["window/getModalData"]
    //   return hoge.posy
    // }, (newval) => {
    //   this.modalData = newval
    // })
  },
  methods: {
    close() {
      console.log({[this.contentKey]:{visible: false}})
      this.$store.commit("window/setModalData", {[this.contentKey]:{visible: false}})
    },
    show() {
      this.$store.commit("window/setModalData", {[this.contentKey]:{visible: true}})
    }
  },
  computed: {
    ...mapGetters({
      modalData: 'window/getModalData'
    }),
    modalClass() {
      if (!this.mounted) {
        return "isHide"
      }
      return this.modalData[this.contentKey].visible ? "" : "isHide";
    },
    posy() {
      return !this.mounted ? "" : this.modalData[this.contentKey].posy
    },
    type() {
      return !this.mounted ? "" : this.modalData[this.contentKey].type
    },
    contents() {
      return !this.mounted ? "" : this.modalData[this.contentKey].contents
    }
  }
}
</script>
