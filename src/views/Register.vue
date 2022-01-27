<template>
  <div class="register-page">
    <UserForm :fields="fields" :endPoint="endPoint" :pageType="pageType" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserForm, { UserFormFieldInfo } from "@/components/UserForm.vue";

export default defineComponent({
  name: "Register",
  components: { UserForm },
  data() {
    return {
      fields: [
        {
          fieldName: "name",
          nameDisplayed: "Your Name",
          type: "text",
          required: true,
          pattern: ".{3,32}",
          placeholder: " ",
          shouldShowValid: true,
        },
        {
          fieldName: "email",
          nameDisplayed: "Email",
          type: "email",
          required: true,
          pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          placeholder: " ",
          shouldShowValid: true,
        },
        {
          fieldName: "phone-number",
          nameDisplayed: "Phone Number",
          type: "tel",
          required: false,
          pattern: "09[0-9]{8}",
          placeholder: "09XXXXXXXX",
          shouldShowValid: true,
        },
        {
          fieldName: "password",
          nameDisplayed: "Password",
          type: "password",
          required: true,
          pattern: "[A-Za-z0-9]{8,}",
          placeholder: " ",
          shouldShowValid: true,
        },
        {
          fieldName: "password-check",
          nameDisplayed: "Password Again",
          type: "password",
          required: true,
          pattern: "[a-z0-9]+",
          placeholder: " ",
          shouldShowValid: false,
        },
      ] as UserFormFieldInfo[],
      endPoint: "https://www.google.com",
      pageType: "Register",
    };
  },
});
</script>

<style lang="scss" scoped>
</style>