<template>
  <div id="change-password-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <AccountForm
      :fieldsSettings="fieldsSettings"
      :formData="formData"
      :pageName="pageName"
      buttonName="Confirm"
      :alertMessage="alertMessage"
      @input="formData[$event.inputName] = $event.value"
      @clickSubmitButton="submit"
    />
  </div>
  <MessageBox
    :isActive="shouldShowMessageBox"
    :message="successMsg"
    type="success"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import AccountForm from "@/components/AccountsForm.vue";
import MessageBox from "@/components/MessageBox.vue";
import { PageInfo, UserInfoInputSetting } from "@/myInterface";

export default defineComponent({
  name: "ChangePasswordPage",
  store: store,
  components: { CurrentPathBar, AccountForm, MessageBox },
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
      fieldsSettings: [
        {
          inputName: "current_password",
          nameDisplayed: "Current Password",
          type: "password",
          required: true,
          pattern: "[A-Za-z0-9]+",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
        {
          inputName: "new_password",
          nameDisplayed: "New Password",
          type: "password",
          required: true,
          pattern: "[a-z0-9A-Z]{8,}",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
        {
          inputName: "new_password_check",
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
        current_password: "",
        new_password: "",
        new_password_check: "",
      } as any,
      pageName: "Change Password" as string,
      alertMessage: "",
      shouldShowMessageBox: false as boolean,
      successMsg: "" as string,
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: "Password",
          path: "#",
        },
      ]);
    },
  },
  methods: {
    async submit(): Promise<any> {
      let rqBody = new URLSearchParams();
      for (let each in this.formData) rqBody.append(each, this.formData[each]);
      let status = (
        (await fetch("http://127.0.0.1:8000/api/change-password", {
          method: "post",
          body: rqBody,
          credentials: "include",
        }).then((resp) => resp.json())) as any
      )["status"];
      if (status === "succeeded") {
        this.alertMessage = "";
        setTimeout(() => {
          this.successMsg = "Password Updated!";
          this.shouldShowMessageBox = true;
          setTimeout(() => {
            this.shouldShowMessageBox = false;
            this.$router.replace("/account-center");
          }, 1500);
        }, 100);
      } else {
        this.alertMessage = status;
        if (status === "wrong password") {
          this.formData.current_password = "";
          this.fieldsSettings
            .filter((e) => e.inputName === "current_password")
            .forEach((e) => (e.shouldAlert = true));
        } else if (status === "password too simple") {
          this.fieldsSettings
            .filter((e) => e.inputName === "new_password")
            .forEach((e) => (e.shouldAlert = true));
        } else if (status === "check your password") {
          this.fieldsSettings
            .filter((e) => e.inputName === "new_password_check")
            .forEach((e) => (e.shouldAlert = true));
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>