<template>
  <button id="proceed-to-checkout-button" @click.once="proceed">
    <IconBase><IconCheck /></IconBase>
    <span class="checkout-caption"><slot /></span>
  </button>
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
      return "/checkout";
    },
  },
  methods: {
    async proceed(): Promise<void> {
      if (this.$route.path !== "/cart") window.location.assign("/cart");
      else {
        let statusCode = await fetch(
          "http://127.0.0.1:8000/api/cart/proceed_to_checkout",
          {
            method: "get",
            credentials: "include",
          }
        ).then((resp) => resp.status);
        if (statusCode === 404 || statusCode === 500) {
          this.$router.push(`/error/${statusCode}`);
        } else window.location.assign("/checkout");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#proceed-to-checkout-button {
  background-color: $black;
  border-radius: 2px;
  border: none;
  font-family: inherit;
  padding: 8px 12px;
  width: 70%;
  color: $white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  .checkout-caption {
    letter-spacing: 1px;
    font-size: 1rem;
    padding: 0 10px;
  }
}
</style>