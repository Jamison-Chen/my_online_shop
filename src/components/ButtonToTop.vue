<template>
  <a id="to-top-button" href="#">
    <IconBase :sideLength="20"><IconUpArrow /></IconBase>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconBase from "./IconBase.vue";
import IconUpArrow from "./icons/IconUpArrow.vue";

export default defineComponent({
  components: { IconBase, IconUpArrow },
});
</script>

<style lang="scss" scoped>
#to-top-button {
  position: fixed;
  bottom: 3vh;
  right: 1vh;
  padding: 5px;
  cursor: pointer;
  color: #444;
}
</style>