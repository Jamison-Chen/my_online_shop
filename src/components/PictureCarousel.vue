<template>
  <div class="picture-carousel">
    <a
      v-for="(each, idx) in pictureInfoList"
      :key="each.title"
      :href="each.href"
      :class="{ active: activePictureIdx === idx }"
    >
      <img :src="each.image" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface PictureInfo {
  image: any;
  href: string;
  title: string;
}

export default defineComponent({
  props: {
    pictureInfoList: {
      type: Array as PropType<PictureInfo[]>,
      required: true,
    },
  },
  data() {
    return {
      activePictureIdx: 0 as number,
    };
  },
});
</script>

<style lang="scss" scoped>
.picture-carousel {
  position: relative;
  height: 100vh;
  width: 100%;
}
</style>