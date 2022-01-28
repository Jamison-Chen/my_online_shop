<template>
  <div class="register-page">
    <UserForm
      :fields="fields"
      :endPoint="endPoint"
      :pageType="pageType"
      @clickSubmitButton="register($event)"
    />
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
      endPoint: "http://127.0.0.1:8000/api/login",
      pageType: "Register",
      response: {} as any,
    };
  },
  methods: {
    async register(formData: any): Promise<any> {
      let requestBody = new URLSearchParams();
      for (let each in formData) {
        requestBody.append(each, formData[each]);
      }
      // The axios approach
      // this.$http.defaults.withCredentials = true;
      // this.response = await this.$http
      //   .post(this.endPoint, requestBody)
      //   .then((resp) => resp);

      // The fetch approach
      this.response = await fetch(this.endPoint, {
        method: "post",
        body: requestBody,
        credentials: "include", // to accept the "set-cookie" header of the response
      }).then((resp) => resp.json());

      if (this.response.status === "passed") {
        this.$router.push("/");
      } else if (this.response.status === "duplicated email") {
      } else if (this.response.status === "different password") {
      } else if (this.response.status === "password too simple") {
      } else if (this.response.status === "name too long") {
      } else if (this.response.status === "info not sufficient") {
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>