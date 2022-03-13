<template>
  <div id="account-form">
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
    <div
      class="message-showed"
      :class="[messageType]"
      v-show="messageShowed !== ''"
    >
      {{ messageShowed }}
    </div>
    <input
      type="button"
      :value="buttonName"
      @click="$emit('clickSubmitButton')"
    />
    <div class="reminder" v-if="pageName === 'Login'">
      Do not have an account? Please
      <a :href="`${publicPath}register`">Sign up</a>
      here.
    </div>
    <div class="reminder" v-else-if="pageName === 'Register'">
      Already have an account? Please
      <a :href="`${publicPath}login`">Sign in</a>
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
    messageShowed: {
      type: String,
      required: true,
    },
    messageType: {
      type: String as PropType<"success" | "warning">,
      required: true,
    },
  },
  components: { FormInput },
  emits: ["input", "clickSubmitButton"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
      formInputDisplayType: "table" as string,
    };
  },
  methods: {
    updateValue(payload: { inputName: string; value: string }): void {
      this.$emit("input", {
        inputName: payload.inputName,
        value: payload.value,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
#account-form {
  width: 320px;
  margin: auto;
  padding: 30px 20px;
  border: 1px solid $lightGray;
  border-radius: 8px;
  & > .input-table {
    display: table;
    width: 100%;
  }
  & > .message-showed {
    margin: 10px 0;
    padding: 5px;
    border-radius: 5px;
    font-size: 0.8rem;
    &.warning {
      color: $lightRed;
      border: 2px solid #dd002277;
      background-color: #dd002222;
    }
    &.success {
      color: $green;
      border: 2px solid #00dd2277;
      background-color: #00dd2222;
    }
  }
  & > input {
    margin: 10px 0 20px 0;
    font-family: inherit;
    font-size: 1.2rem;
    background-color: $black;
    border: none;
    color: $white;
    padding: 4px 16px 8px 16px;
    border-radius: 2px;
    cursor: pointer;
    transition-duration: 300ms;
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