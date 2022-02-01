<template>
  <div class="product-list-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div class="main">
      <ProductInfoCard
        v-for="each in products"
        :key="each.id"
        :productInfo="each"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProductInfo, PageInfo } from "@/myInterface";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import ProductInfoCard from "@/components/ProductInfoCard.vue";

export default defineComponent({
  components: { CurrentPathBar, ProductInfoCard },
  props: {
    fullPathList: {
      type: Array as PropType<PageInfo[]>,
      required: true,
    },
    products: {
      type: Array as PropType<ProductInfo[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.product-list-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }
}
</style>