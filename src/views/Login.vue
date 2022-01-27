<template>
  <div class="login-page">
    <UserForm :fields="fields" :endPoint="endPoint" :pageType="pageType" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserForm, { UserFormFieldInfo } from "@/components/UserForm.vue";

export default defineComponent({
  name: "Login",
  components: { UserForm },
  data() {
    return {
      fields: [
        {
          fieldName: "email",
          nameDisplayed: "Email",
          type: "email",
          required: true,
          pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          placeholder: " ",
          shouldShowValid: false,
        },
        {
          fieldName: "password",
          nameDisplayed: "Password",
          type: "password",
          required: true,
          pattern: "[a-z0-9A-Z]+",
          placeholder: " ",
          shouldShowValid: false,
        },
      ] as UserFormFieldInfo[],
      endPoint: "http://127.0.0.1:8000/api/login",
      pageType: "Login",
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
