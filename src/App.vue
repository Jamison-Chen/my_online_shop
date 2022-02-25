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
import store from "./store";

export default defineComponent({
  store: store,
  components: { Header, Footer, ButtonToTop },
  methods: {
    async redirectIfNeeded(): Promise<void> {
      await Promise.all([
        store.dispatch("checkLoginStatus"),
        store.dispatch("getCartItemList"),
        store.dispatch("getFavoriteList"),
      ]);
      if (
        (this.$route.path.indexOf("/account-center") !== -1 ||
          this.$route.path.indexOf("/favorites") !== -1 ||
          this.$route.path.indexOf("/cart") !== -1 ||
          this.$route.path.indexOf("/checkout") !== -1) &&
        !store.state.isLoggedIn
      ) {
        this.$router.replace("/login");
      } else if (
        (this.$route.path.indexOf("/login") !== -1 ||
          this.$route.path.indexOf("/register") !== -1) &&
        store.state.isLoggedIn
      ) {
        this.$router.replace("/account-center");
      }
    },
  },
  async created() {
    this.redirectIfNeeded();
  },
  async beforeRouteUpdate(to, from) {
    // react to route changes
    this.redirectIfNeeded();
  },
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
  color: inherit;
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
