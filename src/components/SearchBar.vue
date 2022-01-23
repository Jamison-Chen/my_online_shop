<template>
  <div id="search-bar">
    <input
      type="search"
      name="search-input"
      id="search-input"
      placeholder="Search"
    />
    <IconBase id="search-button" :sideLength="iconSize"
      ><IconMagnifier
    /></IconBase>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconBase from "./IconBase.vue";
import IconMagnifier from "./icons/IconMagnifier.vue";

export default defineComponent({
  components: { IconBase, IconMagnifier },
  data() {
    return {
      iconSize: 24 as number,
    };
  },
});
</script>

<style lang="scss" scoped>
#search-bar {
  display: flex;
  align-items: center;
  #search-input {
    border: none;
    border-bottom: 1px solid #aaa;
    margin: 0 10px;
    padding: 0 10px 5px 10px;
    font-size: 1.2rem;
    letter-spacing: 2px;
    &::-webkit-search-cancel-button {
      background: #888;
    }
    &::placeholder {
      font-size: 1.4rem;
      color: #ddd;
      font-weight: 100;
    }
    &:focus {
      outline: none;
      border-bottom-color: #888;
    }
  }
  #search-button {
    transition-duration: 300ms;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
}
</style>