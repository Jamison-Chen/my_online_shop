<template>
  <div class="message-box">hi</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
.message-box {
  position: fixed;
  bottom: 0;
  left: 50vw;
  padding: 2px 8px;
  margin-bottom: 5px;
  transform: translateX(-50%);
  border-radius: 5px;
  border: 2px solid #dd002277;
  &.warning {
    color: #b01;
    background-color: #dd002222;
    border-color: #dd002277;
  }
  &.success {
    color: #b01;
    background-color: #dd002222;
    border-color: #dd002277;
  }
}
</style>