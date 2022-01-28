<template>
  <div class="search-result-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div id="main">
      <ProductInfoCard
        v-for="each in productsResponded"
        :key="each.id"
        :productInfo="each"
        :isFavorite="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentPathBar, { PageInfo } from "@/components/CurrentPathBar.vue";
import ProductInfoCard, { ProductInfo } from "@/components/ProductInfoCard.vue";

export default defineComponent({
  name: "SearchResult",
  components: { CurrentPathBar, ProductInfoCard },
  async created() {
    // TODOS: Arrange the search result.
    this.productsResponded = (await this.search())["data"];
  },
  data() {
    return {
      status: "waiting" as "waiting" | "success" | "failed",
      parentPageList: [{ name: "Home", path: "/" }] as PageInfo[],
      productsResponded: [] as ProductInfo[],
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
      return fetch(endPoint)
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
  async beforeRouteUpdate(to, from) {
    // react to route changes
    if (to.query.query !== from.query.query && to.query.query !== "") {
      this.productsResponded = (await this.search())["data"];
    }
  },
});
</script>

<style lang="scss" scoped>
.search-result-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  #main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }
}
</style>
