<template>
  <div id="checkout-page">
    <CurrentPathBar :parentPageList="fullPathList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import { PageInfo } from "@/myInterface";

export default defineComponent({
  name: "Checkout",
  components: { CurrentPathBar },
  data() {
    return {
      parentPageList: [
        { name: "Home", path: "/" },
        { name: "Cart", path: "/cart" },
      ] as PageInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([{ name: "Checkout", path: "#" }]);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
