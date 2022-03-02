<template>
  <div id="cart-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div id="main">
      <div class="left">
        <CartItemCard
          v-for="each in cartItems"
          :key="each.id"
          :cartItemInfo="each"
        />
      </div>
      <div class="right">
        <div class="total-calc-section">
          <div class="total-before-freight total-calc">
            <span>Subtotal:</span><span>{{ totalBeforeFreight }}</span>
          </div>
          <div class="freight total-calc">
            <span>Freight:</span><span>{{ freight }}</span>
          </div>
        </div>
        <div class="final-cost-section">
          <span>Total:</span><span>{{ total }}</span>
        </div>
        <div class="button-container">
          <ButtonProceedToCheckout>Checkout</ButtonProceedToCheckout>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import CartItemCard from "@/components/CartItemCard.vue";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import ButtonProceedToCheckout from "@/components/ButtonProceedToCheckout.vue";
import { CartItemInfo, PageInfo } from "@/myInterface";

export default defineComponent({
  name: "Cart",
  store: store,
  components: { CartItemCard, CurrentPathBar, ButtonProceedToCheckout },
  data() {
    return {
      parentPageList: [{ name: "Home", path: "" }] as PageInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([{ name: "Cart", path: "#" }]);
    },
    cartItems(): CartItemInfo[] {
      return store.state.cartItemList;
    },
    totalBeforeFreight(): string {
      return `$${store.state.cartTotalCosts}`;
    },
    freight(): string {
      return `$${store.state.freight}`;
    },
    total(): string {
      return `$${store.state.cartTotalCosts + store.state.freight}`;
    },
  },
  async created() {
    await store.dispatch("getCartItemList");
    if (store.state.cartItemCount === 0) {
      this.$router.back();
    }
  },
  async beforeRouteUpdate(to, from) {
    // react to route changes
    await store.dispatch("getCartItemList");
    if (store.state.cartItemCount === 0) {
      this.$router.back();
    }
  },
});
</script>

<style lang="scss" scoped>
#cart-page {
  #main {
    display: flex;
    padding: 10px;
    .left {
      width: 60%;
    }
    .right {
      width: 40%;
      position: sticky;
      top: 0;
      left: 0;
      height: fit-content;
      border-radius: 10px;
      border: 1px solid $noisyWhite;
      margin: 20px;
      box-sizing: border-box;
      .total-calc-section {
        margin: 0 10px;
        padding: 20px;
        border-bottom: 1px solid $noisyWhite;
        .total-calc {
          padding: 5px 0;
          display: flex;
          justify-content: space-between;
        }
      }
      .final-cost-section {
        display: flex;
        justify-content: space-between;
        margin: 30px;
        font-weight: bold;
        letter-spacing: 1px;
      }
      .button-container {
        height: 75px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
