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
import { defineComponent } from "vue";
import store from "@/store";
import IconBase from "./IconBase.vue";
import IconHeart from "./icons/IconHeart.vue";
import IconHeartFill from "./icons/IconHeartFill.vue";

export default defineComponent({
  store: store,
  components: { IconBase, IconHeart, IconHeartFill },
  props: {
    productId: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isCurrentlyFavorite: this.isFavorite as boolean,
      endPoint: "http://127.0.0.1:8000/api/favorites" as string,
    };
  },
  computed: {
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
        this.callAPI(this.isCurrentlyFavorite ? "delete" : "create");
        this.isCurrentlyFavorite = !this.isCurrentlyFavorite;
      } else this.$router.push("/login");
    },
    async callAPI(operation: "create" | "delete"): Promise<void> {
      let requestBody = new URLSearchParams();
      requestBody.append("operation", operation);
      requestBody.append("product", this.productId);
      fetch(this.endPoint, {
        method: "post",
        body: requestBody,
        credentials: "include",
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.favorite-button {
  padding: 10px;
  cursor: pointer;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
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