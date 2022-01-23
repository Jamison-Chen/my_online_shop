<template>
  <div class="product-info-card">
    <a class="picture-section" :href="`/product/${productInfo.id}`">
      <div
        class="fake-picture"
        style="background-color: #ccc; height: 100%; width: 100%"
      ></div>
    </a>
    <div class="non-picture-section">
      <div class="category-tag">{{ productInfo.category }}</div>
      <a class="name-tag" :href="`/product/${productInfo.id}`">
        {{ productInfo.name }}
      </a>
      <div class="price-tag">${{ productInfo.unit_price }}</div>
      <div class="description-tag">{{ productInfo.description }}</div>
      <div class="footer">
        <span class="favorite-caption" :class="{ show: showFavCaption }">{{
          favCaption
        }}</span>
        <div
          class="favorite-button"
          @mouseenter="() => (showFavCaption = true)"
          @mouseleave="() => (showFavCaption = false)"
          @click="changeFavoriteState"
        >
          <IconBase :sideLength="26" :color="favoriteIconColor">
            <IconHeartFill v-if="isCurrentlyFavorite" />
            <IconHeart v-else />
          </IconBase>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import IconBase from "./IconBase.vue";
import IconHeart from "./icons/IconHeart.vue";
import IconHeartFill from "./icons/IconHeartFill.vue";

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
  name: "ProductInfoCard",
  props: {
    productInfo: {
      type: Object as PropType<ProductInfo>,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showFavCaption: false as boolean,
      isCurrentlyFavorite: this.isFavorite,
    };
  },
  components: { IconBase, IconHeart, IconHeartFill },
  computed: {
    favCaption(): string {
      return this.isCurrentlyFavorite
        ? "Remove from Favorite"
        : "Add to Favorite";
    },
    favoriteIconColor(): string {
      return this.isCurrentlyFavorite ? "#FF0050" : "#000";
    },
  },
  methods: {
    changeFavoriteState(): void {
      this.isCurrentlyFavorite = !this.isCurrentlyFavorite;
      // then, do a post to change the favorite sate from back end
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
  & > div,
  & > a {
    width: 50%;
  }
  .picture-section {
    padding-right: 20px;
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
      .favorite-caption {
        font-size: 0.5 * $base-font-size;
        color: transparent;
        transition-duration: 300ms;
        cursor: default;
        user-select: none;
        &.show {
          color: #000;
        }
      }
      .favorite-button {
        padding: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
