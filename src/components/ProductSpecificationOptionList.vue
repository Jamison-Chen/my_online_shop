<template>
  <div class="product-specification-option-list">
    {{ inventoryInfo }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>