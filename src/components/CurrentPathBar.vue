<template>
  <div id="current-path-bar">
    <div class="part-of-path" v-for="each in parentPageList" :key="each.name">
      <a class="path-name" :href="each.path">{{ each.name }}</a>
      <span
        class="slash"
        v-if="each.name !== parentPageList[parentPageList.length - 1].name"
      >
        /
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PageInfo } from "@/myInterface";

export default defineComponent({
  props: {
    parentPageList: {
      type: Array as PropType<PageInfo[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
#current-path-bar {
  margin-bottom: 10px;
  .part-of-path {
    display: inline;
    color: #aaa;
    letter-spacing: 1px;

    .path-name {
      text-decoration: none;
      color: #aaa;
    }
  }
}
</style>