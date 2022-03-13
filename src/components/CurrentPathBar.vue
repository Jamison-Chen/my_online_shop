<template>
  <div id="current-path-bar">
    <div class="part-of-path" v-for="each in parentPageList" :key="each.name">
      <a class="path-name" :href="getCorrectPath(each.path)">{{ each.name }}</a>
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
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    getCorrectPath(originalPath: string): string {
      if (originalPath.indexOf("./") !== -1) {
        let currentPath = window.location.pathname;
        if (currentPath[currentPath.length - 1] !== "/") {
          return `${currentPath}/${originalPath}`;
        }
        return originalPath;
      }
      return `${this.publicPath}${originalPath}`;
    },
  },
});
</script>

<style lang="scss" scoped>
#current-path-bar {
  margin-bottom: 10px;
  .part-of-path {
    display: inline;
    color: $lightGray;
    letter-spacing: 1px;

    .path-name {
      text-decoration: none;
      color: $lightGray;
    }
  }
}
</style>