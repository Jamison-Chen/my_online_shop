<template>
  <div class="picture-carousel">
    <a
      v-for="(each, idx) in pictureInfoList"
      :key="idx"
      :href="each.href"
      class="carousel-picture"
      :class="{ active: activePictureIdx === idx }"
    >
      <div
        class="fake-picture"
        style="height: 100%; width: 100%"
        :style="`background-color:${each.image}`"
      ></div>
    </a>
    <div class="dot-button-bar">
      <div
        class="dot-button"
        v-for="(each, idx) in pictureInfoList"
        :key="idx"
        @click="changePicture(idx)"
        :class="{ active: activePictureIdx === idx }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CarouselContentInfo } from "@/myInterface";

export default defineComponent({
  props: {
    pictureInfoList: {
      type: Array as PropType<CarouselContentInfo[]>,
      required: true,
    },
  },
  data() {
    return {
      activePictureIdx: 0 as number,
      carousel: setInterval(this.autoChangePicture, 6180),
    };
  },
  methods: {
    autoChangePicture(): void {
      if (this.activePictureIdx === this.pictureInfoList.length - 1) {
        this.activePictureIdx = 0;
      } else this.activePictureIdx += 1;
    },
    changePicture(toIdx: number): void {
      clearInterval(this.carousel);
      this.activePictureIdx = toIdx;
      this.carousel = setInterval(this.autoChangePicture, 6180);
    },
  },
});
</script>

<style lang="scss" scoped>
.picture-carousel {
  position: relative;
  height: 100vh;
  width: 100%;
  .carousel-picture {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition-duration: 500ms;
    z-index: 100;
    &.active {
      opacity: 1;
      z-index: 200;
    }
  }
  .dot-button-bar {
    position: absolute;
    bottom: 5%;
    left: 50%;
    display: flex;
    justify-content: space-between;
    transform: translateX(-50%);
    z-index: 300;
    .dot-button {
      width: 10px;
      height: 10px;
      margin: 0 5px;
      border-radius: 100px;
      background-color: $black;
      opacity: 0.2;
      &:hover,
      &.active {
        opacity: 0.5;
      }
    }
  }
}
</style>