<style lang="scss" scoped>
$time: 0.3s;
.squareImage {
  width: 100%;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    padding-top: 100%;
    display: block;
  }
  &:hover {
    .squareImage_content {
      filter: brightness(20%) grayscale(100%);
    }
    .squareImage_title {
      opacity: 1;
    }
  }
}
.squareImage_content {
  position: absolute;
  top: 0;
  left: 0;
  transition: filter $time linear;
  width: 100%;
  height: 100%;
  filter: brightness(100%) grayscale(0%);
}
.squareImage_title {
  position: absolute;
  font-size: 1rem;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity $time linear;
  color: white;
  opacity: 0;
  padding: 0.2rem;
  user-select: none;
  white-space: pre-wrap;
}
</style>

<template>
  <div class="squareImage">
    <component :is="imageType" :src="src" class="squareImage_content" />
    <p class="squareImage_title" v-text="title" />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    imageType: {
      type: String,
      required: false,
      default: "cryptImage"
    }
  },
  components: {
    CryptImage: () => import("~/components/contents/CryptImage.vue"),
    CryptImageWithLb: () => import("~/components/contents/CryptImageWithLb.vue")
  }
}
</script>
