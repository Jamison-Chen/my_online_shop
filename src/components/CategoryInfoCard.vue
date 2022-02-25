<template>
  <a class="category-info-card" :href="`${publicPath}${categoryInfo.name}`">
    <div class="category-cover-picture">
      <div
        class="fake-picture"
        style="
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: #eee;
        "
      ></div>
    </div>
    <div class="category-name">{{ categoryInfo.name }}</div>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CategoryInfo } from "@/myInterface";

export default defineComponent({
  name: "CategoryInfoCard",
  props: {
    categoryInfo: {
      type: Object as PropType<CategoryInfo>,
      required: true,
    },
  },
  data() {
    return {
      publicPath:
        process.env.NODE_ENV === "production" ? "/my_online_shop/" : "/",
    };
  },
  methods: {},
});
</script>

<style scoped lang="scss">
.category-info-card {
  height: fit-content;
  display: block;
  text-decoration: none;
  .category-cover-picture {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
  .category-name {
    text-align: start;
    margin: 10px 0;
    font-size: 1.1rem;
    letter-spacing: 2px;
    color: $deepGray;
  }
  &:hover {
    text-decoration-line: underline;
    text-decoration-color: $deepGray;
  }
}
</style>
