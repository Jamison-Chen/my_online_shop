<template>
  <div class="product-info-card">
    <a class="picture-section" :href="`/product/${productInfo.id}`">
      <div
        class="fake-picture"
        style="background-color: #ccc; height: 512px; width: 100%"
      ></div>
    </a>
    <div class="non-picture-section">
      <div class="category-tag">{{ productInfo.category.toUpperCase() }}</div>
      <a class="name-tag" :href="`/product/${productInfo.id}`">
        {{ productInfo.name }}
      </a>
      <div class="price-tag">${{ productInfo.unit_price }}</div>
      <div class="description-tag">{{ productInfo.description }}</div>
      <div class="footer">
        <ButtonAddToFavorites
          :productId="productInfo.id.toString()"
          :isFavorite="productInfo.is_favorite"
        />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import ButtonAddToFavorites from "./ButtonAddToFavorites.vue";
import { ProductInfo } from "./MyInterface.vue";

export default defineComponent({
  name: "ProductInfoCard",
  components: { ButtonAddToFavorites },
  props: {
    productInfo: {
      type: Object as PropType<ProductInfo>,
      required: true,
    },
  },
});
</script>


<style scoped lang="scss">
.product-info-card {
  $base-font-size: 1rem;
  width: 100%;
  margin: 20px 0;
  display: flex;
  align-items: center;
  & > div,
  & > a {
    width: 50%;
  }
  .picture-section {
    max-height: 35vh;
    padding-right: 20px;
    overflow: hidden;
  }
  .non-picture-section {
    text-align: start;
    display: flex;
    flex-direction: column;
    letter-spacing: 1px;
    .category-tag {
      color: #aaa;
      font-size: 0.8 * $base-font-size;
    }
    .name-tag {
      text-decoration: none;
      color: #000;
      font-size: 1.4 * $base-font-size;
      margin: 10px 0;
    }
    .price-tag {
      font-size: 1.2 * $base-font-size;
      margin: 5px 0;
    }
    .description-tag {
      font-size: $base-font-size;
      color: #888;
      line-height: 1.5 * $base-font-size;
      text-align: justify;
      text-justify: inter-ideograph;
      margin: 5px 0;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
