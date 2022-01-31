<template>
  <input type="button" value="Log Out" @click="logout" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "AccountCenter",
  store: store,
  methods: {
    async logout(): Promise<void> {
      await store.dispatch("logout");
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
</style>