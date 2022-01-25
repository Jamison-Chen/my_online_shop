<template>
  <div class="page-block">
    <div class="block-title">{{ blockTitle }}</div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    blockTitle: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.page-block {
  margin: 30px 0;
  .block-title {
    margin-bottom: 15px;
    font-size: 2rem;
    letter-spacing: 2px;
  }
}
</style>