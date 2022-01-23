<template>
  <div class="categorized-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div id="main">
      <ProductInfoCard
        v-for="each in products"
        :key="each.id"
        :productInfo="each"
        :isFavorite="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import ProductInfoCard from "@/components/ProductInfoCard.vue";

interface PageInfo {
  name: string;
  path: string;
}

interface ProductInfo {
  id: string;
  name: string;
  unit_price: number;
  category: string;
  brand: string;
  description: string;
  inventory: number;
  quantity_sold: number;
}

export default defineComponent({
  components: { ProductInfoCard, CurrentPathBar },
  data() {
    return {
      parentPageList: [
        {
          name: "Home",
          path: "/",
        },
      ] as PageInfo[],
      categoryName: this.$route.params.category as string,
      products: [] as ProductInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: this.categoryName,
          path: "#",
        },
      ]);
    },
  },
  methods: {
    async fetchData(category: string): Promise<any> {
      let endPoint = `http://127.0.0.1:8000/api/product/all?category=${category}`;
      return await fetch(endPoint).then((res) => res.json());
    },
  },
  async created() {
    this.products = (await this.fetchData(this.categoryName))["data"];
  },
  // react to route changes
  async beforeRouteUpdate(to, from) {
    this.products = (await this.fetchData(this.categoryName))["data"];
  },
});
</script>

<style lang="scss" scoped>
.categorized-page {
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
