<template>
  <Header />
  <router-view />
  <ButtonToTop />
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import ButtonToTop from "@/components/ButtonToTop.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  components: { Header, Footer, ButtonToTop },
});
</script>

<style lang="scss">
:root {
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  margin: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 100px;
  background: #aaa;
  &:hover {
    background: #888;
  }
}

body {
  margin: 0;
}

a {
  text-decoration: none;
  position: relative;
  &:visited,
  &:active {
    color: inherit;
  }
  &[data-title]:hover::after {
    background-color: #000;
    color: #fff;
    padding: 2px 6px 4px 6px;
    font-size: 0.8rem;
    letter-spacing: 1px;
    border-radius: 5px;
    content: attr(data-title);
    position: absolute;
    top: 130%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 2px 2px 10px 2px #ccc;
  }
}

#app {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
