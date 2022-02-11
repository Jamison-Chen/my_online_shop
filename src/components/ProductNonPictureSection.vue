<template>
  <div id="non-picture-section">
    <h1 id="product-name">{{ productInfo.name }}</h1>
    <div id="unit-price">${{ productInfo.unit_price }}</div>
    <div id="description" v-if="productInfo.description !== ''">
      {{ productInfo.description }}
    </div>
    <div id="product-specification">
      <ProductSpecificationOptionList
        v-for="(each, idx) in specificationGroupList"
        :key="each"
        :options="each"
        :idxOfParent="idx"
        :groupName="specificationGroupName[idx]"
        :defaultSelected="updatedSelectedSpec[idx]"
        @updateSelection="updateSelection($event)"
      />
    </div>
    <div id="footer">
      <ButtonAddToCart :selectedInventoryId="selectedInventoryId" />
      <ButtonAddToFavorites :productInfo="productInfo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ProductInfo } from "@/myInterface";
import ProductSpecificationOptionList from "./ProductSpecificationOptionList.vue";
import ButtonAddToFavorites from "./ButtonAddToFavorites.vue";
import ButtonAddToCart from "./ButtonAddToCart.vue";

export default defineComponent({
  components: {
    ProductSpecificationOptionList,
    ButtonAddToFavorites,
    ButtonAddToCart,
  },
  props: {
    productInfo: {
      type: Object as PropType<ProductInfo>,
      required: true,
    },
  },
  data() {
    return {
      // the reason of not using an object as the data structure
      // is due to the async data rendering issue
      initSpecGroupName: [] as string[],
      selectedSpecList: [] as string[],
    };
  },
  computed: {
    specificationGroupName() {
      if (this.initSpecGroupName.length === 0) {
        // select the first combination as the default
        for (let each in this.productInfo.inventory as any) {
          let specs = each.split("/");
          let res = [];
          for (let eachSpec of specs) res.push(eachSpec.split(":")[0]);
          return res;
        }
      }
      return this.initSpecGroupName;
    },
    updatedSelectedSpec: {
      get(): string[] {
        if (this.selectedSpecList.length === 0) {
          // select the first combination as the default
          for (let each in this.productInfo.inventory as any) {
            let specs = each.split("/");
            let res = [];
            for (let eachSpec of specs) res.push(eachSpec.split(":")[1]);
            return res;
          }
        }
        return this.selectedSpecList;
      },
      set(newCombination: string[]): void {
        this.selectedSpecList = newCombination;
      },
    },
    specificationGroupList(): Set<string>[] {
      let res: any[] = [];
      for (let each in this.productInfo.inventory as any) {
        let specs = each.split("/");
        for (let i = 0; i < specs.length; i++) {
          let s = specs[i].split(":")[1];
          if (res[i] === undefined) res[i] = new Set([s]);
          else (res[i] as Set<string>).add(s);
        }
      }
      return res;
    },
    selectedInventoryId(): string {
      let key = "";
      for (let i = 0; i < this.specificationGroupName.length; i++) {
        key += `${this.specificationGroupName[i]}:${this.updatedSelectedSpec[i]}/`;
      }
      key = key.substring(0, key.length - 1);
      return this.productInfo.inventory_id[key];
    },
  },
  methods: {
    updateSelection(e: any): void {
      let copy = [...this.updatedSelectedSpec];
      copy[e.idx] = e.selection;
      this.updatedSelectedSpec = copy;
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
    color: $gray;
    font-size: $font-size;
    line-height: $font-size * 1.5;
    margin: 10px 0;
  }
  #footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #product-specification {
    margin: 10px 0;
  }
}
</style>