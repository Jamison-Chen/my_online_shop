<template>
  <div id="edit-profile-page">
    <CurrentPathBar :parentPageList="fullPathList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import { PageInfo } from "@/myInterface";

export default defineComponent({
  name: "EditProfilePage",
  store: store,
  components: { CurrentPathBar },
  data() {
    return {
      parentPageList: [
        {
          name: "Home",
          path: "/",
        },
        {
          name: "Account Center",
          path: "/account-center",
        },
      ] as PageInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: "Edit",
          path: "#",
        },
      ]);
    },
  },
});
</script>

<style lang="scss" scoped>
</style>