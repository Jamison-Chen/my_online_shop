<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <ProductInfoCard v-for="each in products" :key="each" :productInfo="each" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductInfoCard from "@/components/ProductInfoCard.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Shop",
  components: {
    ProductInfoCard,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async fetchData(category: any): Promise<any> {
      let endPoint = `http://127.0.0.1:8000/api/product/all?category=${category}`;
      return await fetch(endPoint).then((res) => res.json());
    },
  },
  async created() {
    this.products = (await this.fetchData(this.$route.params.category))["data"];
  },
  async beforeRouteUpdate(to, from) {
    // react to route changes
    this.products = (await this.fetchData(to.params.category))["data"];
  },
});
</script>
