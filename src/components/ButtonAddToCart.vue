<template>
  <div class="add-to-cart-section">
    <input
      class="quantity-input"
      type="number"
      name="quantity"
      v-model="quantity"
      :disabled="selectedInventoryId === undefined"
    />
    <div
      class="cart-button"
      :class="{ disabled: selectedInventoryId === undefined }"
      :data-title="caption"
      @click="addToCart"
    >
      <IconBase :sideLength="26">
        <IconCart />
      </IconBase>
    </div>
  </div>
  <MessageBox />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import IconBase from "./IconBase.vue";
import IconCart from "./icons/IconCart.vue";
import MessageBox from "./MessageBox.vue";

export default defineComponent({
  store: store,
  components: { IconBase, IconCart, MessageBox },
  props: {
    selectedInventoryId: {
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
    };
  },
  computed: {
    caption(): string {
      if (store.state.isLoggedIn) {
        if (this.selectedInventoryId !== undefined) {
          return "Add to Cart";
        }
        return "Out of Stock";
      } else return "Please Log In";
    },
  },
  methods: {
    async addToCart(): Promise<void> {
      if (store.state.isLoggedIn) {
        if (this.selectedInventoryId !== undefined) {
          await store.dispatch("addToCart", {
            selectedInventoryId: this.selectedInventoryId as string,
            quantity: this.quantity,
          });
        }
      } else this.$router.push("/login");
    },
  },
});
</script>

<style lang="scss" scoped>
.add-to-cart-section {
  display: flex;
  align-items: stretch;
  margin: 0 20px;
  .quantity-input {
    font-family: inherit;
    font-size: 1.4rem;
    width: 80px;
    outline: none;
    border: none;
    border-bottom: 1px solid #aaa;
    text-align: center;
    letter-spacing: 1px;
    margin: 10px 0;
    background-color: transparent;
    &:disabled {
      color: #ccc;
    }
    &::-webkit-inner-spin-button {
      height: 30px;
    }
  }
  .cart-button {
    padding: 10px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    color: #000;
    &.disabled {
      cursor: no-drop;
      color: #888;
    }
    &:hover {
      opacity: 0.8;
    }
    &[data-title]:hover::after {
      content: attr(data-title);
      white-space: nowrap;
      background-color: #000;
      color: #fff;
      padding: 2px 6px 4px 6px;
      font-size: 0.8rem;
      letter-spacing: 1px;
      border-radius: 5px;
      position: absolute;
      width: fit-content;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: 2px 2px 10px 2px #ccc;
    }
  }
}
</style>