<template>
  <div id="thank-you-page">
    <h1 class="page-title">Thank You for Shopping!</h1>
    <a :href="publicPath" class="back-to-home-button">Back to Homepage</a>
    <a :href="`${publicPath}track-order`" class="order-status-tracking-button">
      Track My Order
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ThankYouPage",
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  created() {},
  beforeRouteUpdate(to, from) {},
});
</script>


<style lang="scss" scoped>
.back-to-home-button {
  display: inline-block;
  margin: 10px;
  font-size: 1rem;
  letter-spacing: 1px;
  padding: 6px 10px 8px 10px;
  background-color: $black;
  color: $white;
  border-radius: 2px;
  &:hover {
    opacity: 0.8;
  }
}
.order-status-tracking-button {
  color: $lightBlue;
  letter-spacing: 1px;
  font-size: 0.9rem;
  padding: 2px 4px;
  margin: 10px 5px;
  cursor: pointer;
  &:hover {
    color: $blue;
  }
}
</style>