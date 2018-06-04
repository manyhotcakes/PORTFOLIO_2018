<template>
<!-- eslint-disable -->
  <div class="wrap" @modalclose="close">
    <div class="background" :class="modalClass" @click="close"/>
    <div class="modal" :class="modalClass">
      <component :is="type" :contents="contents" class="modal_body" />
    </div>
    <div class="close" :class="modalClass" >
      <div class="close_icon" @click="close"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$time: 0.4s;
$modalmaxwidth: 864px;
.modal {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 80%;
  height: calc(100% - 20px - 30px);
  max-width: $modalmaxwidth;
  background-color: white;
  border-radius: 4px;
  z-index: 100;
  opacity: 1;
  visibility: visible;
  padding: $sz-line-section 0 $sz-line-section $sz-line-section;
  transition: opacity $time ease-out, visibility 0s ease-out;
  &_head {
    position: relative;
    min-height: 20px;
    &_title {
      text-align: left;
      white-space: pre-wrap;
      margin-right: 20px;
    }
  }
  &_body {
    min-height: 300px;
    overflow: auto;
    padding-right: $sz-line-section;
    height: 100%;
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
  background: rgba($background-modal-color, 0.8);
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  opacity: 1;
  visibility: visible;
  transition: opacity $time ease-out, visibility 0s ease-out;
  &.isHide {
    opacity: 0;
    visibility: hidden;
  }
}
.close {
  $size: 30px;
  position: fixed;
  width: 80%;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 864px;
  margin: auto;
  z-index: 100;
  text-align: right;
  &_icon {
    cursor: pointer;
    width: $size;
    height: $size;
    display: inline-block;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAMAAAC6CgRnAAAAPFBMVEX///8AAAD9/f2CgoKAgIAAAAAAAAAAAABLS0sAAAAAAACqqqqqqqq6urpKSkpISEgAAAC7u7u5ubn////zbsMcAAAAE3RSTlMASv6rqwAWS5YMC7/AyZWVFcrJCYaKfAAAAHhJREFUeF590kkOgCAQRFEaFVGc+/53FYmbz6JqBbyQMFSYuoQuV+iTflnstI7ssLXRvMWRaEMs84e2uVckuZe6knL0hiSPObXhj6ChzoEkIolIIpKIO4joICAIeDd7QGIfCCjOKe9HEk8mnxpIAup/F31RPZP9fAG3IAyBSJe0igAAAABJRU5ErkJggg==)
      100% 0 no-repeat;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
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
    this.mounted = true;
  },
  methods: {
    close() {
      this.$nextTick(() => {
        if (this.$route.hash.indexOf(process.env.MODALPAGEHASH_PREFIX) === 0) {
          this.$store.commit("window/setModalData", {[this.contentKey]:{visible: false}})
          this.$store.commit("window/setScrollStop", false)
          this.$router.go(-1)
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      modalData: 'window/getModalData'
    }),
    currentData() {
      return this.modalData[this.contentKey]
    },
    modalClass() {
      if (!this.mounted) {
        return "isHide"
      }
      return this.currentData.visible ? "" : "isHide";
    },
    posy() {
      return !this.mounted ? "" : this.currentData.posy
    },
    type() {
      return !this.mounted ? "" : this.currentData.type
    },
    contents() {
      return !this.mounted ? "" : this.currentData.contents
    }
  }
}
</script>
