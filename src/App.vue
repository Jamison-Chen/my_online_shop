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
  background: $lightGray;
  &:hover {
    background: $gray;
  }
}

body {
  margin: 0;
}

a {
  text-decoration: none;
  &:visited,
  &:active {
    color: inherit;
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
