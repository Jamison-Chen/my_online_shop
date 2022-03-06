<template>
  <ProductListPage :fullPathList="fullPathList" :products="products" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductListPage from "@/components/ProductListPage.vue";
import { ProductInfo, PageInfo } from "@/myInterface";
import store from "@/store";

export default defineComponent({
  name: "Categorized",
  store: store,
  components: { ProductListPage },
  data() {
    return {
      parentPageList: [{ name: "Home", path: "" }] as PageInfo[],
      categoryName: this.$route.params.category as string,
      products: [] as ProductInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        { name: this.categoryName, path: "./#" },
      ]);
    },
  },
  methods: {
    fetchData(category: string): Promise<any> {
      let endPoint = `${store.state.backendApiUrl}/product/all?category=${category}`;
      return fetch(endPoint, { method: "get", credentials: "include" }).then(
        (res) => res.json()
      );
    },
  },
  async created() {
    this.products = (await this.fetchData(this.categoryName))["data"];
  },
  // react to route changes
  async beforeRouteUpdate(to, from) {
    if (to.params.category !== from.params.category) {
      this.products = (await this.fetchData(this.categoryName))["data"];
    }
  },
});
</script>

<style lang="scss" scoped>
</style>
