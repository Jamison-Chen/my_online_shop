<template>
  <div id="account-center-page">
    <h1>Hi, {{ userName }}</h1>
    <input id="logout-button" type="button" value="Log Out" @click="logout" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "AccountCenter",
  store: store,
  computed: {
    userName(): string {
      return store.state.userInfo.name;
    },
  },
  methods: {
    async logout(): Promise<void> {
      await store.dispatch("logout");
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
#logout-button {
  margin: 10px 0 20px 0;
  font-family: inherit;
  font-size: 1.2rem;
  background-color: #000;
  border: none;
  color: #fff;
  padding: 4px 12px 8px 12px;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
</style>