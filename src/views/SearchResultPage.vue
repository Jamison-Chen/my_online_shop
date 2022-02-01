<template>
  <ProductListPage :fullPathList="fullPathList" :products="products" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductListPage from "@/components/ProductListPage.vue";
import { ProductInfo, PageInfo } from "@/myInterface";

export default defineComponent({
  name: "SearchResult",
  components: { ProductListPage },
  data() {
    return {
      status: "waiting" as "waiting" | "success" | "failed",
      parentPageList: [{ name: "Home", path: "/" }] as PageInfo[],
      products: [] as ProductInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([{ name: "Search Result", path: "#" }]);
    },
  },
  methods: {
    search(): Promise<any> {
      this.status = "waiting";
      let endPoint = `http://127.0.0.1:8000/api/search?query=${this.$route.query.query}`;
      return fetch(endPoint, { method: "get", credentials: "include" })
        .then((res) => {
          this.status = "success";
          return res.json();
        })
        .catch((err) => {
          this.status = "failed";
          return err.message;
        });
    },
  },
  async created() {
    // TODOS: Arrange the search result.
    this.products = (await this.search())["data"];
  },
  async beforeRouteUpdate(to, from) {
    // react to route changes
    if (to.query.query !== from.query.query && to.query.query !== "") {
      this.products = (await this.search())["data"];
    }
  },
});
</script>

<style lang="scss" scoped>
</style>
