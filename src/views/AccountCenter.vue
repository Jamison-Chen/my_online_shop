<template>
  <div id="account-center-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <h1>Hi, {{ userName }}</h1>
    <a :href="`${publicPath}account-center/edit`">Edit Profile</a>
    <a :href="`${publicPath}account-center/password`">Change Password</a>
    <a :href="`${publicPath}track-order`">Track My Order</a>
    <input
      id="logout-button"
      type="button"
      value="Log Out"
      @click.once="logout"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import { PageInfo } from "@/myInterface";

export default defineComponent({
  name: "AccountCenter",
  store: store,
  components: { CurrentPathBar },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      parentPageList: [
        {
          name: "Home",
          path: "",
        },
      ] as PageInfo[],
    };
  },
  computed: {
    userName(): string {
      return store.state.userInfo.name;
    },
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: "Account Center",
          path: "./#",
        },
      ]);
    },
  },
  methods: {
    async logout(): Promise<void> {
      await store.dispatch("logout");
      window.location.replace(this.publicPath);
    },
  },
});
</script>

<style lang="scss" scoped>
a {
  display: block;
  margin: 15px auto;
  color: $lightBlue;
  cursor: pointer;
  width: fit-content;
  &:hover {
    color: $blue;
  }
}
#logout-button {
  margin: 10px 0 20px 0;
  font-family: inherit;
  font-size: 1.2rem;
  background-color: $black;
  border: none;
  color: $white;
  padding: 4px 12px 8px 12px;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
</style>