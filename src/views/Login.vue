<template>
  <div class="login-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <AccountForm
      :fields="fields"
      :formData="formData"
      :pageName="pageName"
      :buttonName="pageName"
      :alertMessage="alertMessage"
      @input="formData[$event.inputName] = $event.value"
      @clickSubmitButton="login"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import AccountForm from "@/components/AccountsForm.vue";
import { UserInfoInputSetting, PageInfo } from "@/myInterface";
import store from "@/store";

export default defineComponent({
  name: "Login",
  store: store,
  components: { AccountForm, CurrentPathBar },
  data() {
    return {
      fields: [
        {
          inputName: "email",
          nameDisplayed: "Email",
          type: "email",
          required: false,
          pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
        {
          inputName: "password",
          nameDisplayed: "Password",
          type: "password",
          required: false,
          pattern: "[a-z0-9A-Z]+",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
      ] as UserInfoInputSetting[],
      formData: {
        email: "",
        password: "",
      } as any,
      pageName: "Login" as string,
      alertMessage: "",
      parentPageList: [
        {
          name: "Home",
          path: "/",
        },
      ] as PageInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: "Login",
          path: "#",
        },
      ]);
    },
  },
  methods: {
    async login(): Promise<any> {
      let rqBody = new URLSearchParams();
      for (let each in this.formData) rqBody.append(each, this.formData[each]);
      await store.dispatch("checkLoginStatus", rqBody);
      let loginStatus = store.state.loginStatus;
      if (store.state.isLoggedIn) window.location.replace("/");
      else if (loginStatus === "user not found") {
        this.alertMessage = store.state.loginStatus;
        this.formData.email = "";
        this.fields
          .filter((e) => e.inputName === "email")
          .forEach((e) => (e.shouldAlert = true));
        this.formData.password = "";
        this.fields
          .filter((e) => e.inputName === "password")
          .forEach((e) => (e.shouldAlert = true));
      } else if (loginStatus === "wrong password") {
        this.alertMessage = store.state.loginStatus;
        this.formData.password = "";
        this.fields
          .filter((e) => e.inputName === "password")
          .forEach((e) => (e.shouldAlert = true));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
