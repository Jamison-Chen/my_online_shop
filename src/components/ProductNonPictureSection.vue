<template>
  <div id="non-picture-section">
    <h1 id="product-name">{{ productInfo.name }}</h1>
    <div id="unit-price">${{ productInfo.unit_price }}</div>
    <div id="description" v-if="productInfo.description !== ''">
      {{ productInfo.description }}
    </div>
    <div id="product-specification">
      {{ specificationMap }}
      <!-- <ProductSpecificationOptionList
        v-for="each in specificationMap"
        :key="each"
        :options="specificationMap[each]"
      /> -->
    </div>
    <div id="footer">
      <ButtonAddToFavorites :productInfo="productInfo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProductInfo } from "@/myInterface";
import ButtonAddToFavorites from "./ButtonAddToFavorites.vue";
import ProductSpecificationOptionList from "./ProductSpecificationOptionList.vue";

export default defineComponent({
  components: { ButtonAddToFavorites, ProductSpecificationOptionList },
  props: {
    productInfo: {
      type: Object as PropType<ProductInfo>,
      required: true,
    },
  },
  computed: {
    specificationMap(): any {
      let res: any[] = [];
      for (let each in this.productInfo.inventory as any) {
        let sp = each.split("_");
        for (let i = 0; i < sp.length; i++) {
          if (res[i] === undefined) res[i] = [sp[i]];
          else (res[i] as Array<string>).push(sp[i]);
        }
      }
      for (let i = 0; i < res.length; i++) res[i] = new Set(res[i]);
      return res;
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
  margin: 0 10px;
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
  #footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>