<template>
  <div id="header" :class="{ 'at-homepage': isHomepage }">
    <a id="logo" href="/">Hello World</a>
    <SearchBar :iconSize="iconSize" />
    <div id="side-button-bar">
      <a href="#" class="side-button">
        <IconBase :sideLength="iconSize"><IconHeart /></IconBase>
      </a>
      <IconBase class="side-button" :sideLength="iconSize"
        ><IconCart
      /></IconBase>
      <a href="/login" class="side-button">
        <IconBase :sideLength="iconSize"><IconPersonFill /></IconBase>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "./SearchBar.vue";
import IconBase from "./IconBase.vue";
import IconHeart from "./icons/IconHeart.vue";
import IconCart from "./icons/IconCart.vue";
import IconPersonFill from "./icons/IconPersonFill.vue";

export default defineComponent({
  components: { SearchBar, IconBase, IconHeart, IconCart, IconPersonFill },
  data() {
    return {
      iconSize: 22 as number,
    };
  },
  computed: {
    isHomepage(): boolean {
      return this.$route.path === "/";
    },
  },
  created() {},
});
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  color: #444;
  z-index: 1000;
  &.at-homepage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  #logo {
    margin: auto 20px;
    font-size: 2rem;
  }
  #side-button-bar {
    display: flex;
    align-items: center;
    margin: 0 10px;
    .side-button {
      display: flex;
      align-items: center;
      margin: 0 15px;
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