<template>
  <div id="footer">Hello World © 2022. All rights reserved.</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    console.log();
  },
});
</script>

<style lang="scss" scoped>
#footer {
  padding: 10vh 0;
  font-size: 0.8rem;
  color: #888;
  letter-spacing: 1px;
}
</style>