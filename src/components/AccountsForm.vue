<template>
  <div id="user-form">
    <div class="brand-icon"></div>
    <div class="input-table">
      <FormInput
        v-for="eachSetting in fieldsSettings"
        :key="eachSetting.inputName"
        :setting="eachSetting"
        :initialValue="formData[eachSetting.inputName]"
        :displayType="formInputDisplayType"
        @input="updateValue($event)"
      />
    </div>
    <div class="alert-message" v-show="alertMessage !== ''">
      {{ alertMessage }}
    </div>
    <input
      type="button"
      :value="buttonName"
      @click="$emit('clickSubmitButton')"
    />
    <div class="reminder" v-if="pageName === 'Login'">
      Doesn't have an account? Please
      <a href="/register">Sign up</a>
      here.
    </div>
    <div class="reminder" v-else-if="pageName === 'Register'">
      Already have an account? Please
      <a href="/login">Sign in</a>
      here.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FormInput from "./FormInput.vue";
import { UserInfoInputSetting } from "@/myInterface";

export default defineComponent({
  props: {
    fieldsSettings: {
      type: Array as PropType<UserInfoInputSetting[]>,
      required: true,
    },
    formData: {
      type: Object as any,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
    buttonName: {
      type: String,
      required: true,
    },
    alertMessage: {
      type: String,
      required: true,
    },
  },
  components: { FormInput },
  emits: ["input", "clickSubmitButton"],
  data() {
    return {
      formInputDisplayType: "table" as string,
    };
  },
  computed: {
    localFormData(): any {
      return this.formData;
    },
  },
  methods: {
    updateValue(payload: { inputName: string; newVal: string }): void {
      this.formData[payload.inputName] = payload.newVal;
      this.$emit("input", {
        inputName: payload.inputName,
        value: this.localFormData[payload.inputName],
      });
    },
  },
});
</script>

<style lang="scss" scoped>
#user-form {
  width: 320px;
  margin: auto;
  padding: 30px 20px;
  border: 1px solid $lightGray;
  border-radius: 8px;
  & > .input-table {
    display: table;
    width: 100%;
  }
  & > .alert-message {
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
    color: $lightRed;
    font-size: 0.8rem;
    border: 2px solid #dd002277;
    background-color: #dd002222;
  }
  & > input {
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
  .reminder {
    text-align: center;
    font-size: 0.9rem;
    & > a {
      color: $lightBlue;
    }
  }
}
</style>