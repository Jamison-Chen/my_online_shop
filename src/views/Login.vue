<template>
  <div class="login-page">
    <UserForm
      :fields="fields"
      :endPoint="endPoint"
      :pageType="pageType"
      @clickSubmitButton="login($event)"
    />
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
      response: {} as any,
    };
  },
  methods: {
    async login(formData: any): Promise<any> {
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
      } else if (this.response.status === "user not found") {
      } else if (this.response.status === "wrong password") {
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
