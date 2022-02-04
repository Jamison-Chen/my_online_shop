<template>
  <div
    class="favorite-button"
    :data-title="favCaption"
    @click="changeFavoriteStatus"
  >
    <IconBase :sideLength="26" :color="favoriteIconColor">
      <IconHeartFill v-if="isCurrentlyFavorite" />
      <IconHeart v-else />
    </IconBase>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import store from "@/store";
import IconBase from "./IconBase.vue";
import IconHeart from "./icons/IconHeart.vue";
import IconHeartFill from "./icons/IconHeartFill.vue";
import { ProductInfo } from "@/myInterface";

export default defineComponent({
  store: store,
  components: { IconBase, IconHeart, IconHeartFill },
  props: {
    productInfo: {
      type: Object as PropType<ProductInfo>,
      required: true,
    },
  },
  computed: {
    isCurrentlyFavorite(): boolean {
      return store.state.favoriteList.some(
        (each) => each.id === this.productInfo.id
      );
    },
    favCaption(): string {
      if (store.state.isLoggedIn) {
        if (this.isCurrentlyFavorite) return "Remove from Favorites";
        else return "Add to Favorites";
      } else return "Please Log In";
    },
    favoriteIconColor(): string {
      return this.isCurrentlyFavorite ? "#f05" : "#000";
    },
  },
  methods: {
    changeFavoriteStatus(): void {
      if (store.state.isLoggedIn) {
        store.dispatch("updateFavoriteList", {
          productInfo: this.productInfo,
          operation: this.isCurrentlyFavorite ? "delete" : "create",
        });
      } else this.$router.push("/login");
    },
  },
});
</script>

<style lang="scss" scoped>
.favorite-button {
  padding: 10px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  &[data-title]:hover::after {
    content: attr(data-title);
    background-color: #000;
    color: #fff;
    padding: 2px 6px 4px 6px;
    font-size: 0.8rem;
    letter-spacing: 1px;
    border-radius: 5px;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 2px 2px 10px 2px #ccc;
  }
}
</style>