<template>
  <div class="login-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <UserForm
      :fields="fields"
      :formData="formData"
      :endPoint="endPoint"
      :pageType="pageType"
      :alertMessage="alertMessage"
      @input="this.formData[$event.fieldName] = $event.value"
      @clickSubmitButton="login"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import UserForm from "@/components/UserForm.vue";
import { UserFormFieldInfo, PageInfo } from "@/myInterface";
import store from "@/store";

export default defineComponent({
  name: "Login",
  store: store,
  components: { UserForm, CurrentPathBar },
  data() {
    return {
      fields: [
        {
          fieldName: "email",
          nameDisplayed: "Email",
          type: "email",
          required: false,
          pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          placeholder: " ",
          shouldAlert: false,
        },
        {
          fieldName: "password",
          nameDisplayed: "Password",
          type: "password",
          required: false,
          pattern: "[a-z0-9A-Z]+",
          placeholder: " ",
          shouldAlert: false,
        },
      ] as UserFormFieldInfo[],
      formData: {
        email: "",
        password: "",
      } as any,
      endPoint: "http://127.0.0.1:8000/api/login" as string,
      pageType: "Login" as string,
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
      let requestBody = new URLSearchParams();
      for (let each in this.formData) {
        requestBody.append(each, this.formData[each]);
      }
      await store.dispatch("checkLoginStatus", requestBody);
      let loginStatus = store.state.loginStatus;
      if (store.state.isLoggedIn) window.location.replace("/");
      else if (loginStatus === "user not found") {
        this.alertMessage = store.state.loginStatus;
        this.formData.email = "";
        this.fields
          .filter((e) => e.fieldName === "email")
          .forEach((e) => (e.shouldAlert = true));
        this.formData.password = "";
        this.fields
          .filter((e) => e.fieldName === "password")
          .forEach((e) => (e.shouldAlert = true));
      } else if (loginStatus === "wrong password") {
        this.alertMessage = store.state.loginStatus;
        this.formData.password = "";
        this.fields
          .filter((e) => e.fieldName === "password")
          .forEach((e) => (e.shouldAlert = true));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
