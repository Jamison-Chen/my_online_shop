<template>
  <div class="register-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <UserForm
      :fields="fields"
      :formData="formData"
      :endPoint="endPoint"
      :pageType="pageType"
      :alertMessage="alertMessage"
      @input="this.formData[$event.fieldName] = $event.value"
      @clickSubmitButton="register"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import UserForm from "@/components/UserForm.vue";
import { UserFormFieldInfo, PageInfo } from "@/myInterface";

export default defineComponent({
  name: "Register",
  store: store,
  components: { UserForm, CurrentPathBar },
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
          shouldAlert: false,
        },
        {
          fieldName: "email",
          nameDisplayed: "Email",
          type: "email",
          required: true,
          pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          placeholder: " ",
          shouldAlert: false,
        },
        {
          fieldName: "phone-number",
          nameDisplayed: "Phone #",
          type: "tel",
          required: false,
          pattern: "09[0-9]{8}",
          placeholder: "09XXXXXXXX",
          shouldAlert: false,
        },
        {
          fieldName: "date-of-birth",
          nameDisplayed: "Date Of Birth",
          type: "date",
          required: false,
          pattern: ".+",
          placeholder: " ",
          shouldAlert: false,
        },
        {
          fieldName: "password",
          nameDisplayed: "Password",
          type: "password",
          required: true,
          pattern: "[A-Za-z0-9]{8,}",
          placeholder: " ",
          shouldAlert: false,
        },
        {
          fieldName: "password-check",
          nameDisplayed: "Password Check",
          type: "password",
          required: true,
          pattern: "[a-z0-9]+",
          placeholder: " ",
          shouldAlert: false,
        },
      ] as UserFormFieldInfo[],
      formData: {
        name: "",
        email: "",
        "phone-number": "",
        password: "",
        "password-check": "",
      } as any,
      endPoint: "http://127.0.0.1:8000/api/register",
      pageType: "Register",
      alertMessage: "",
      response: {} as any,
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
          name: "Register",
          path: "#",
        },
      ]);
    },
  },
  methods: {
    async register(): Promise<any> {
      let requestBody = new URLSearchParams();
      for (let each in this.formData) {
        requestBody.append(each, this.formData[each]);
      }
      // The fetch approach
      this.response = await fetch(this.endPoint, {
        method: "post",
        body: requestBody,
        credentials: "include", // to accept the "set-cookie" header of the response
      }).then((resp) => resp.json());

      if (this.response.status === "passed") {
        store.commit("login");
        window.location.replace("/");
      } else {
        this.alertMessage = this.response.status;
        if (this.response.status === "info not sufficient") {
        } else if (
          this.response.status === "name too long" ||
          this.response.status === "name too short"
        ) {
          this.fields
            .filter((e) => e.fieldName === "name")
            .forEach((e) => (e.shouldAlert = true));
        } else if (this.response.status === "duplicated email") {
          this.fields
            .filter((e) => e.fieldName === "email")
            .forEach((e) => (e.shouldAlert = true));
        } else if (this.response.status === "password too simple") {
          this.fields
            .filter((e) => e.fieldName === "password")
            .forEach((e) => (e.shouldAlert = true));
        } else if (this.response.status === "check your password") {
          this.fields
            .filter((e) => e.fieldName === "password-check")
            .forEach((e) => (e.shouldAlert = true));
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.register-page {
  margin: 20px;
}
</style>