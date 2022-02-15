<template>
  <div class="register-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <AccountForm
      :fieldsSettings="fieldsSettings"
      :formData="formData"
      :pageName="pageName"
      :buttonName="pageName"
      :alertMessage="alertMessage"
      @input="updateValue"
      @clickSubmitButton="register"
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
  name: "Register",
  store: store,
  components: { AccountForm, CurrentPathBar },
  data() {
    return {
      fieldsSettings: [
        {
          inputName: "name",
          nameDisplayed: "Your Name",
          type: "text",
          required: true,
          pattern: ".{2,32}",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
        {
          inputName: "email",
          nameDisplayed: "Email",
          type: "email",
          required: true,
          pattern: "[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
        {
          inputName: "phone_number",
          nameDisplayed: "Phone #",
          type: "tel",
          required: false,
          pattern: "09[0-9]{8}",
          placeholder: "09XXXXXXXX",
          shouldAlert: false,
          disabled: false,
        },
        {
          inputName: "date_of_birth",
          nameDisplayed: "Date Of Birth",
          type: "date",
          required: false,
          pattern: ".+",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
        {
          inputName: "password",
          nameDisplayed: "Password",
          type: "password",
          required: true,
          pattern: "[A-Za-z0-9]{8,}",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
        {
          inputName: "password_check",
          nameDisplayed: "Password Check",
          type: "password",
          required: true,
          pattern: "[A-Za-z0-9]+",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
      ] as UserInfoInputSetting[],
      formData: {
        name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        password: "",
        password_check: "",
      } as any,
      pageName: "Register",
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
          name: "Register",
          path: "#",
        },
      ]);
    },
  },
  methods: {
    updateValue(event: { inputName: string; value: string }): void {
      this.formData[event.inputName] = event.value;
    },
    async register(): Promise<any> {
      let requestBody = new URLSearchParams();
      for (let each in this.formData) {
        if (this.formData[each] !== "") {
          requestBody.append(each, this.formData[each]);
        }
      }
      // The fetch approach
      let response: any = {};
      response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "post",
        body: requestBody,
        credentials: "include", // to accept the "set-cookie" header of the response
      }).then((resp) => resp.json());

      if (response.status === "passed") {
        store.commit("login");
        window.location.replace("/");
      } else {
        this.alertMessage = response.status;
        if (response.status === "info not sufficient") {
          this.fieldsSettings
            .filter((e) => this.formData[e.inputName] === "")
            .forEach((e) => (e.shouldAlert = true));
        } else if (
          response.status === "name too long" ||
          response.status === "name too short"
        ) {
          this.fieldsSettings
            .filter((e) => e.inputName === "name")
            .forEach((e) => (e.shouldAlert = true));
        } else if (response.status === "duplicated email") {
          this.fieldsSettings
            .filter((e) => e.inputName === "email")
            .forEach((e) => (e.shouldAlert = true));
        } else if (response.status === "password too simple") {
          this.fieldsSettings
            .filter((e) => e.inputName === "password")
            .forEach((e) => (e.shouldAlert = true));
        } else if (response.status === "check your password") {
          this.fieldsSettings
            .filter((e) => e.inputName === "password_check")
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