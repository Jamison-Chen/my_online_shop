<template>
  <div id="non-picture-section">
    <h1 id="product-name">{{ productInfo.name }}</h1>
    <div id="unit-price">{{ priceWithDollarSign }}</div>
    <div id="description" v-if="productInfo.description !== ''">
      {{ productInfo.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface ProductInfo {
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
  props: {
    productInfo: {
      type: Object as PropType<ProductInfo>,
      require: true,
    },
  },
  computed: {
    priceWithDollarSign(): string {
      let price: number | undefined = this.productInfo?.unit_price;
      return `$${price}`;
    },
  },
});
</script>

<style lang="scss" scoped>
#non-picture-section {
  letter-spacing: 1px;
  text-align: justify;
  text-justify: inter-ideograph;
  height: fit-content;
  position: sticky;
  top: 0;
  left: 0;
  #product-name {
    font-weight: 300;
  }
  #unit-price {
    font-size: 1.2rem;
  }
  #description {
    $font-size: 1rem;
    color: #888;
    font-size: $font-size;
    line-height: $font-size * 1.5;
    margin: 10px 0;
  }
}
</style>