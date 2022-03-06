<template>
  <ProductListPage :fullPathList="fullPathList" :products="products" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import ProductListPage from "@/components/ProductListPage.vue";
import { ProductInfo, PageInfo } from "@/myInterface";

export default defineComponent({
  name: "Favorites",
  store: store,
  components: { ProductListPage },
  data() {
    return {
      parentPageList: [{ name: "Home", path: "" }] as PageInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([{ name: "Favorites", path: "./#" }]);
    },
    products(): ProductInfo[] {
      return store.state.favoriteList;
    },
  },
  async created() {
    if (store.state.isLoggedIn) store.dispatch("getFavoriteList");
  },
  async beforeRouteUpdate(to, from) {
    // react to route changes
    if (store.state.isLoggedIn) store.dispatch("getFavoriteList");
  },
});
</script>

<style lang="scss" scoped>
</style>
