<template>
  <div class="product-page">
    <h1>{{ productInfo }}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Product",
  props: {},
  data() {
    return {
      productInfo: {},
    };
  },
  methods: {
    async fetchData(productId: any): Promise<any> {
      let endPoint = `http://127.0.0.1:8000/api/product/${productId}`;
      return await fetch(endPoint).then((res) => res.json());
    },
  },
  async created() {
    this.productInfo = (await this.fetchData(this.$route.params.productId))[
      "data"
    ];
  },
  async beforeRouteUpdate(to, from) {
    // react to route changes
    this.productInfo = (await this.fetchData(to.params.productId))["data"];
  },
});
</script>