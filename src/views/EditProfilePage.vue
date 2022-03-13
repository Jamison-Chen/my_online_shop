<template>
  <div id="edit-profile-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div class="main">
      <div class="text-input-table">
        <FormInput
          v-for="eachSetting in textInputSettings"
          :key="eachSetting.inputName"
          :setting="eachSetting"
          :initialValue="originalFormData[eachSetting.inputName]"
          displayType="table"
          @input="updateValue($event)"
        />
      </div>
      <div id="gender-input-row">
        <span>Gender</span>
        <label for="gender" v-for="each in genderOptios" :key="each">
          <input
            type="radio"
            name="gender"
            :value="each"
            :checked="each === originalFormData.gender"
            v-model="updatedFormData.gender"
          />
          {{ each }}
        </label>
      </div>
      <div class="alert-message" v-show="messageShowed !== ''">
        {{ messageShowed }}
      </div>
      <div class="button-section">
        <input
          type="button"
          value="Save"
          @click="save"
          id="save-button"
          class="button"
        />
        <input
          type="button"
          value="Discard"
          @click="discard"
          id="discard-button"
          class="button"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import FormInput from "@/components/FormInput.vue";
import { PageInfo, UserInfoInputSetting } from "@/myInterface";

export default defineComponent({
  name: "EditProfilePage",
  store: store,
  components: { CurrentPathBar, FormInput },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      parentPageList: [
        {
          name: "Home",
          path: "",
        },
        {
          name: "Account Center",
          path: "account-center",
        },
      ] as PageInfo[],
      textInputSettings: [
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
      ] as UserInfoInputSetting[],
      genderOptios: ["Male", "Female", "Others"],
      updatedFormData: {
        name: "",
        email: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
      } as any,
      pageName: "EditProfilePage",
      messageShowed: "",
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: "Edit",
          path: "./#",
        },
      ]);
    },
    originalFormData() {
      let formData: any = {};
      for (let each in store.state.userInfo) {
        if (Object.keys(this.updatedFormData).includes(each)) {
          formData[each] = (store.state.userInfo as any)[each];
          this.updatedFormData[each] = (store.state.userInfo as any)[each];
        }
      }
      return formData;
    },
  },
  methods: {
    updateValue(event: { inputName: string; value: string }): void {
      this.updatedFormData[event.inputName] = event.value;
    },
    async save(): Promise<void> {
      let requestBody = new URLSearchParams();
      for (let each in this.updatedFormData) {
        if (this.updatedFormData[each] !== "") {
          requestBody.append(each, this.updatedFormData[each]);
        }
      }
      let response = await fetch(`${store.state.backendApiUrl}/edit-profile`, {
        method: "post",
        body: requestBody,
        credentials: "include",
      }).then((resp) => resp.json());
      if (response.status === "succeeded") {
        window.location.replace(`${this.publicPath}account-center`);
      } else {
        this.messageShowed = response.status;
        if (response.status === "info not sufficient") {
          this.textInputSettings
            .filter((e) => this.updatedFormData[e.inputName] === "")
            .forEach((e) => (e.shouldAlert = true));
        } else if (
          response.status === "name too long" ||
          response.status === "name too short"
        ) {
          this.textInputSettings
            .filter((e) => e.inputName === "name")
            .forEach((e) => (e.shouldAlert = true));
        } else if (response.status === "duplicate email") {
          this.textInputSettings
            .filter((e) => e.inputName === "email")
            .forEach((e) => (e.shouldAlert = true));
        } else if (response.status === "email not verified") {
          store.dispatch("logout");
          this.$router.replace({
            name: "Login",
            params: {
              messageShowed: response.message,
            },
          });
        }
      }
    },
    discard(): void {
      this.$router.replace("/account-center");
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  width: 320px;
  margin: 0 auto;
  .text-input-table {
    display: table;
    width: 100%;
  }
  #gender-input-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 10px 0;
    span {
      margin-right: 50px;
    }
    label {
      display: inline-block;
      margin-right: 5px;
      line-height: 1.4rem;
    }
  }
}
.alert-message {
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  color: $lightRed;
  font-size: 0.8rem;
  border: 2px solid #dd002277;
  background-color: #dd002222;
}
.button {
  margin: 10px 0 20px 0;
  font-family: inherit;
  border: none;
  padding: 4px 12px 8px 12px;
  cursor: pointer;
  &#discard-button {
    background-color: transparent;
    color: $lightBlue;
    font-size: 0.9rem;
    &:hover {
      color: $blue;
    }
  }
  &#save-button {
    font-size: 1.2rem;
    background-color: $black;
    color: $white;
    border-radius: 2px;
    transition-duration: 500ms;
    &:hover {
      background-color: $white;
      color: $black;
    }
  }
}
</style>