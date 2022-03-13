<template>
  <button id="proceed-to-checkout-button" @click.once="proceed">
    <IconBase><IconCheck /></IconBase>
    <span class="checkout-caption"><slot /></span>
  </button>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import IconBase from "./IconBase.vue";
import IconCheck from "./icons/IconCheck.vue";

export default defineComponent({
  store: store,
  components: {
    IconBase,
    IconCheck,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    buttonLink(): string {
      return "/checkout";
    },
  },
  methods: {
    async proceed(): Promise<void> {
      if (store.state.cartItemCount !== 0) {
        if (this.$route.path.indexOf("/cart") === -1) {
          window.location.assign(`${this.publicPath}cart`);
        } else {
          let statusCode = await fetch(
            `${store.state.backendApiUrl}/cart/proceed_to_checkout`,
            {
              method: "get",
              credentials: "include",
            }
          ).then((resp) => resp.status);
          if (statusCode === 404 || statusCode === 500) {
            this.$router.push({
              name: "Error",
              params: { statusCode: statusCode },
            });
          } else window.location.assign(`${this.publicPath}checkout`);
        }
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