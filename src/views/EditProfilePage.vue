<template>
  <div id="edit-profile-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div class="input-table">
      <FormInput
        v-for="eachSetting in fieldsSettings"
        :key="eachSetting.inputName"
        :setting="eachSetting"
        :initialValue="originalFormData[eachSetting.inputName]"
        displayType="table"
        @input="updateValue($event)"
      />
    </div>
    <div class="alert-message" v-show="alertMessage !== ''">
      {{ alertMessage }}
    </div>
    <input type="button" value="Save" @click="save" class="save-button" />
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
          inputName: "name",
          nameDisplayed: "Your Name",
          type: "text",
          required: false,
          pattern: ".{2,32}",
          placeholder: " ",
          shouldAlert: false,
          disabled: false,
        },
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
      updatedFormData: {
        name: "",
        email: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
      } as any,
      pageName: "EditProfilePage",
      alertMessage: "",
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: "Edit",
          path: "#",
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
    save(): void {},
  },
});
</script>

<style lang="scss" scoped>
.input-table {
  display: table;
  width: 320px;
  margin: 0 auto;
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
.save-button {
  margin: 10px 0 20px 0;
  font-family: inherit;
  font-size: 1.2rem;
  background-color: $black;
  border: none;
  color: $white;
  padding: 4px 12px 8px 12px;
  border-radius: 2px;
  cursor: pointer;
  transition-duration: 500ms;
  &:hover {
    background-color: $white;
    color: $black;
  }
}
</style>