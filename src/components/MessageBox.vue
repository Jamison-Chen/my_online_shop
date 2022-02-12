<template>
  <div class="message-box" :class="[{ active: isActive }, type]">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String as PropType<"warning" | "success">,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.message-box {
  position: fixed;
  bottom: 0;
  left: 50vw;
  padding: 3px 10px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  transform: translate(-50%, 100%);
  border-radius: 5px;
  transition-duration: 300ms;
  &.active {
    transform: translate(-50%, -20%);
    transition-duration: 100ms;
  }
  &.warning {
    color: $white;
    background-color: $red;
  }
  &.success {
    color: $white;
    background-color: $green;
  }
}
</style>