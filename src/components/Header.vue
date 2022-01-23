<template>
  <div id="header">
    <h1 id="logo">Hello World</h1>
    <SearchBar />
    <div id="side-button-bar">
      <a href="#" class="side-button">
        <IconBase :sideLength="iconSize"><IconHeart /></IconBase>
      </a>
      <IconBase class="side-button" :sideLength="iconSize"
        ><IconCart
      /></IconBase>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "./SearchBar.vue";
import IconBase from "./IconBase.vue";
import IconHeart from "./icons/IconHeart.vue";
import IconCart from "./icons/IconCart.vue";

export default defineComponent({
  components: { SearchBar, IconBase, IconHeart, IconCart },
  data() {
    return {
      iconSize: 24 as number,
    };
  },
});
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #444;
  #logo {
    margin: 15px;
    color: #2c3e50;
  }
  #side-button-bar {
    display: flex;
    align-items: center;
    margin: 0 10px;
    .side-button {
      display: flex;
      align-items: center;
      margin: 0 10px;
      color: inherit;
      transition-duration: 300ms;
      &:visited,
      &:active {
        color: inherit;
      }
      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }
}
</style>