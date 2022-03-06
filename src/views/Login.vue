<template>
  <div class="login-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <AccountForm
      v-if="!shouldShowSendEmailSection"
      :fieldsSettings="fieldsSettings"
      :formData="formData"
      :pageName="pageName"
      :buttonName="pageName"
      :messageShowed="messageShowed"
      :messageType="messageType"
      @input="updateValue"
      @clickSubmitButton="login"
    />
    <div v-else>
      <div class="email-not-verified-message">
        Your account hasn't been verified yet. Please check your email inbox, or
        click the button below to get another verification email.
      </div>
      <div class="email-not-verified-message">
        Click
        <span class="inline-button" @click="shouldShowSendEmailSection = false">
          here</span
        >
        to login again if you just verified.
      </div>
      <div class="email-not-verified-message">
        Click
        <span class="inline-button" @click="requestSendVerificationEmail">
          here</span
        >
        to get another verification email.
      </div>
    </div>
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
      publicPath:
        process.env.NODE_ENV === "production" ? "/my_online_shop/" : "/",
      fieldsSettings: [
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
      messageShowed: "" as string,
      messageType: "warning" as "warning" | "success",
      parentPageList: [
        {
          name: "Home",
          path: "",
        },
      ] as PageInfo[],
      shouldShowSendEmailSection: false as boolean,
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: "Login",
          path: "./#",
        },
      ]);
    },
  },
  methods: {
    updateValue(event: { inputName: string; value: string }): void {
      this.formData[event.inputName] = event.value;
    },
    async login(): Promise<any> {
      let rqBody = new URLSearchParams();
      for (let each in this.formData) rqBody.append(each, this.formData[each]);
      await store.dispatch("checkLoginStatus", rqBody);

      let loginStatus = store.state.loginStatus;
      if (store.state.isLoggedIn) window.location.replace(this.publicPath);
      else {
        this.messageType = "warning";
        this.messageShowed = "";
        if (loginStatus === "user not found") {
          this.messageShowed = store.state.loginStatus;
          this.formData.email = "";
          this.fieldsSettings
            .filter((e) => e.inputName === "email")
            .forEach((e) => (e.shouldAlert = true));
          this.formData.password = "";
          this.fieldsSettings
            .filter((e) => e.inputName === "password")
            .forEach((e) => (e.shouldAlert = true));
        } else if (loginStatus === "wrong password") {
          this.messageShowed = store.state.loginStatus;
          this.formData.password = "";
          this.fieldsSettings
            .filter((e) => e.inputName === "password")
            .forEach((e) => (e.shouldAlert = true));
        } else if (loginStatus === "email not verified") {
          this.shouldShowSendEmailSection = true;
        }
      }
    },
    async requestSendVerificationEmail(): Promise<void> {
      // TODOS: send request to send another verification email
      let rqBody = new URLSearchParams();
      for (let each in this.formData) rqBody.append(each, this.formData[each]);
      let response = await fetch(
        `${store.state.backendApiUrl}/resend-verification-email`,
        {
          method: "post",
          body: rqBody,
          credentials: "include",
        }
      ).then((resp) => resp.json());
      if (response.status === "succeeded") {
        this.shouldShowSendEmailSection = false;
        this.formData = {
          email: "",
          password: "",
        };
        this.messageShowed = response.message;
        this.messageType = "success";
      }
    },
    applyStepInMessageIfNeeded(): void {
      if (Object.keys(this.$route.params).includes("messageShowed")) {
        this.messageType = "success";
        this.messageShowed = this.$route.params.messageShowed as string;
      }
    },
  },
  created() {
    this.applyStepInMessageIfNeeded();
  },
  beforeRouteUpdate(to, from) {
    // react to route changes
    this.applyStepInMessageIfNeeded();
  },
});
</script>

<style lang="scss" scoped>
.email-not-verified-message {
  max-width: 400px;
  text-align: justify;
  margin: 30px auto;
  text-justify: inter-ideograph;
  font-size: 1.1rem;
  line-height: 1.8rem;
  letter-spacing: 1px;
}
.inline-button {
  color: $lightBlue;
  text-decoration: underline;
  cursor: pointer;
  :hover {
    color: $blue;
  }
}
</style>
