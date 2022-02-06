<template>
  <div class="cart-item-card">
    <IconBase class="trash-can-button" @click="deleteCartItem"
      ><IconTrashCan
    /></IconBase>
    <a class="picture-container" :href="`/product/${cartItemInfo.product_id}`">
      <img
        class="fake-img"
        style="width: 100%; height: 100%; background-color: #ccc"
      />
    </a>
    <div class="item-info-section">
      <a
        class="product-name item-info"
        :href="`/product/${cartItemInfo.product_id}`"
        >{{ cartItemInfo.product_name }}</a
      >
      <div class="specification item-info">{{ productSpec }}</div>
      <div class="price-quantity item-info">{{ priceQuantity }}</div>
      <div class="subtotal item-info">{{ subtotal }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { CartItemInfo } from "@/myInterface";
import IconBase from "./IconBase.vue";
import IconTrashCan from "./icons/IconCross.vue";
import store from "@/store";

export default defineComponent({
  props: {
    cartItemInfo: {
      type: Object as PropType<CartItemInfo>,
      required: true,
    },
  },
  components: { IconBase, IconTrashCan },
  computed: {
    productSpec(): string {
      return `${this.cartItemInfo.color}, ${this.cartItemInfo.size}`;
    },
    priceQuantity(): string {
      return `$${this.cartItemInfo.unit_price} ⨯ ${this.cartItemInfo.quantity}`;
    },
    subtotal(): string {
      return `subtotal: $${this.cartItemInfo.subtotal_costs}`;
    },
  },
  methods: {
    deleteCartItem(): void {
      store.dispatch("deleteFromCart", this.cartItemInfo);
    },
  },
});
</script>

<style lang="scss" scoped>
.cart-item-card {
  position: relative;
  padding: 30px 0 10px 0;
  margin: 0 10px;
  display: flex;
  border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
  min-height: 160px;
  .trash-can-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 0;
    cursor: pointer;
  }
  .picture-container {
    width: 30%;
    overflow: hidden;
  }
  .item-info-section {
    box-sizing: border-box;
    padding-left: 10px;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item-info {
      text-align: start;
      &.product-name {
        font-size: 1.1rem;
        width: fit-content;
      }
      &.specification {
        font-size: 0.9rem;
      }
      &.price-quantity {
        color: #aaa;
      }
      &.subtotal {
        text-align: end;
        letter-spacing: 1px;
      }
    }
  }
}
</style>