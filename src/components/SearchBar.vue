<template>
  <div id="search-bar">
    <input
      type="search"
      name="search-input"
      id="search-input"
      placeholder="Search"
      v-model.trim="query"
      @keypress.enter="search"
    />
    <IconBase id="search-button" :sideLength="iconSize" @click="search"
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
  props: {
    iconSize: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      query: "" as string,
    };
  },
  methods: {
    search() {
      if (this.query !== "") {
        this.$router.push(
          `/search-result?query=${this.query.split(" ").join(",")}`
        );
        this.query = "";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#search-bar {
  display: flex;
  align-items: center;
  #search-input {
    border: none;
    border-bottom: 1px solid $lightGray;
    margin: 0 10px;
    padding: 0 10px 5px 10px;
    font-size: 1.2rem;
    letter-spacing: 2px;
    font-family: inherit;
    background-color: transparent;
    &::-webkit-search-cancel-button {
      background: $gray;
    }
    &::placeholder {
      font-size: 1.4rem;
      color: $noisyWhite;
      font-weight: 100;
    }
    &:focus {
      outline: none;
      border-bottom-color: $gray;
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