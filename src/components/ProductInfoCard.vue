<template>
  <div class="product-info-card">
    <div @click="viewProduct(productInfo['id'])">{{ productInfo["name"] }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductInfoCard",
  props: {
    productInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    viewProduct(productId: number): void {
      this.$router.push(`/product/${productId}`);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product-info-card {
  cursor: pointer;
}
</style>
