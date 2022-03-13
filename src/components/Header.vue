<template>
  <div id="header" :class="{ 'at-homepage': isHomepage }">
    <a id="logo" :href="publicPath">Hello World</a>
    <SearchBar :iconSize="iconSize" />
    <div id="side-button-bar">
      <a
        :href="`${publicPath}${isLoggedIn ? 'favorites' : 'login'}`"
        class="side-button"
        data-title="Favorites"
      >
        <IconBase :sideLength="iconSize"><IconHeart /></IconBase>
      </a>
      <div
        class="side-button cart"
        :data-count="cartItemNumber"
        :class="{ 'show-item-count': shouldShowItemCount }"
        data-title="Cart"
        @click="toggleCartAndFetchCartData"
      >
        <IconBase :sideLength="iconSize"><IconCart /></IconBase>
      </div>
      <a
        :href="`${publicPath}${isLoggedIn ? 'account-center' : 'login'}`"
        class="side-button"
        data-title="Account"
      >
        <IconBase :sideLength="iconSize"><IconPersonFill /></IconBase>
      </a>
    </div>
  </div>
  <CartPreviewSection
    :isActive="isCartPreviewSectionActive"
    @close="isCartPreviewSectionActive = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBar from "./SearchBar.vue";
import IconBase from "./IconBase.vue";
import IconHeart from "./icons/IconHeart.vue";
import IconCart from "./icons/IconCart.vue";
import IconPersonFill from "./icons/IconPersonFill.vue";
import CartPreviewSection from "./CartPreviewSection.vue";
import store from "@/store";

export default defineComponent({
  store: store,
  components: {
    SearchBar,
    IconBase,
    IconHeart,
    IconCart,
    IconPersonFill,
    CartPreviewSection,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      iconSize: 22 as number,
      isCartPreviewSectionActive: false as boolean,
    };
  },
  computed: {
    isHomepage(): boolean {
      return this.$route.path === "/";
    },
    isLoggedIn(): boolean {
      return store.state.isLoggedIn;
    },
    cartItemNumber(): number {
      return store.state.cartItemCount;
    },
    shouldShowItemCount(): boolean {
      return (
        Boolean(store.state.cartItemCount) &&
        this.$route.path.indexOf("/cart") === -1 &&
        this.$route.path.indexOf("/checkout") === -1
      );
    },
  },
  methods: {
    toggleCartAndFetchCartData(): void {
      if (
        this.$route.path.indexOf("/cart") === -1 &&
        this.$route.path.indexOf("/checkout") === -1 &&
        this.$route.path.indexOf("/login") === -1 &&
        this.$route.path.indexOf("/register") === -1
      ) {
        this.isCartPreviewSectionActive = true;
        store.dispatch("getCartItemList");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  color: $deepGray;
  z-index: 1000;
  &.at-homepage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  #logo {
    margin: auto 20px;
    font-size: 2rem;
  }
  #side-button-bar {
    display: flex;
    align-items: center;
    margin: 0 10px;
    .side-button {
      display: flex;
      align-items: center;
      margin: 0 15px;
      color: inherit;
      transition-duration: 300ms;
      position: relative;
      cursor: pointer;
      &:visited,
      &:active {
        color: inherit;
      }
      &:hover {
        opacity: 0.8;
      }
      &[data-title]:hover::after {
        background-color: $black;
        color: $white;
        padding: 2px 6px 4px 6px;
        font-size: 0.8rem;
        letter-spacing: 1px;
        border-radius: 5px;
        content: attr(data-title);
        position: absolute;
        top: 130%;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 2px 2px 10px 2px $noisyWhite;
      }
      &.cart.show-item-count[data-count]::before {
        content: attr(data-count);
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%) scale(0.8);
        padding: 2px 4px;
        border-radius: 100%;
        background-color: $lightRed;
        color: $white;
        font-size: 0.7rem;
      }
    }
  }
}
</style>