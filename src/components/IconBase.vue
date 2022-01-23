<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="sideLength"
    :height="sideLength"
    viewBox="0 0 16 16"
  >
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    sideLength: {
      type: Number,
      default: 18,
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
});
</script>
