<template>
  <div
    class="background"
    :class="{ active: isActive }"
    @click="$emit('close')"
  />
  <div id="cart-preview-section" :class="{ active: isActive }">
    <div class="title">Cart</div>
    <div class="cart-item-list">
      <CartItemCard
        v-for="each in cartItems"
        :key="each.id"
        :cartItemInfo="each"
      />
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
    </div>
    <div class="button-container">
      <ButtonProceedToCheckout>Proceed to Checkout</ButtonProceedToCheckout>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CartItemInfo } from "@/myInterface";
import store from "@/store";
import CartItemCard from "./CartItemCard.vue";
import ButtonProceedToCheckout from "./ButtonProceedToCheckout.vue";

export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  store: store,
  components: {
    CartItemCard,
    ButtonProceedToCheckout,
  },
  computed: {
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
});
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  opacity: 0.5;
  z-index: 1000;
  display: none;
  &.active {
    display: initial;
  }
}
#cart-preview-section {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 30vw;
  min-width: 350px;
  position: fixed;
  top: 0;
  left: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  padding-top: 20px;
  background-color: #fff;
  z-index: 1100;
  transition-duration: 300ms;
  &.active {
    transform: translateX(-100%);
  }
  .title {
    font-size: 1.6rem;
    letter-spacing: 1px;
    margin: 20px 0;
  }
  .cart-item-list {
    height: 100%;
    overflow-y: scroll;
    .total-calc-section {
      margin: 0 10px;
      padding: 20px;
      border-bottom: 1px solid #ddd;
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
    &::-webkit-scrollbar {
      width: 1px;
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      &:hover {
        background: #aaa;
      }
    }
  }
  .button-container {
    height: 75px;
    display: flex;
    align-items: center;
  }
}
</style>