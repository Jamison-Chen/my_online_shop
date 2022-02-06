<template>
  <a id="proceed-to-checkout-button" :href="buttonLink">
    <IconBase><IconCheck /></IconBase>
    <span class="checkout-caption">Checkout</span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconBase from "./IconBase.vue";
import IconCheck from "./icons/IconCheck.vue";

export default defineComponent({
  components: {
    IconBase,
    IconCheck,
  },
  computed: {
    buttonLink(): string {
      return this.$route.path !== "/cart" ? "/cart" : "/checkout";
    },
  },
});
</script>

<style lang="scss" scoped>
#proceed-to-checkout-button {
  background-color: #000;
  border-radius: 2px;
  padding: 8px 12px;
  width: 70%;
  letter-spacing: 1px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  .checkout-caption {
    padding: 0 10px;
  }
}
</style>