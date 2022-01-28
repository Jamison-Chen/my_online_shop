<template>
  <div id="user-form">
    <div class="brand-icon"></div>
    <div class="input-table">
      <div class="input-row" v-for="each in fields" :key="each.fieldName">
        <label :for="each.fieldName">{{ each.nameDisplayed }}</label>
        <input
          :type="each.type"
          :name="each.fieldName"
          :required="each.required"
          :pattern="each.pattern"
          :placeholder="each.placeholder"
          :class="{ 'should-show-valid': each.shouldShowValid }"
          v-model="formData[each.fieldName]"
          size="20"
        />
        <span></span>
      </div>
    </div>
    <input
      type="button"
      :value="pageType"
      @click="$emit('clickSubmitButton', formData)"
    />
    <div class="reminder" v-if="pageType === 'Login'">
      Doesn't have an account? Please
      <a href="../register">Sign up</a>
      here.
    </div>
    <div class="reminder" v-else>
      Already have an account? Please
      <a href="../login">Sign in</a>
      here.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface UserFormFieldInfo {
  fieldName: "name" | "email" | "password" | "date_of_birth" | "phone_number";
  nameDisplayed:
    | "Name"
    | "Email"
    | "Password"
    | "Date of Birth"
    | "Phone Number";
  type: "text" | "email" | "password" | "date" | "tel";
  required: boolean;
  pattern: string;
  placeholder: string;
  shouldShowValid: boolean;
}

export default defineComponent({
  props: {
    fields: {
      type: Array as PropType<UserFormFieldInfo[]>,
      required: true,
    },
    endPoint: {
      type: String,
      required: true,
    },
    pageType: {
      type: String as PropType<"Login" | "Register">,
      required: true,
    },
  },
  emits: ["clickSubmitButton"],
  data() {
    return {
      formData: {} as any,
    };
  },
});
</script>

<style lang="scss" scoped>
#user-form {
  width: 320px;
  margin: auto;
  padding: 30px 20px;
  border: 1px solid #aaa;
  border-radius: 8px;
  & > .input-table {
    display: table;
    width: 100%;
    & > .input-row {
      width: 100%;
      display: table-row;
      label,
      span {
        display: table-cell;
        text-align: start;
        vertical-align: middle;
      }
      & > input {
        display: table-cell;
        border: none;
        border-bottom: 1px solid #aaa;
        margin: 10px;
        line-height: 1.4rem;
        font-family: inherit;
        letter-spacing: 1px;
        &::placeholder {
          color: #ccc;
        }
        & + span:after {
          content: "✖";
          color: transparent;
        }
        &:invalid:not(:placeholder-shown).should-show-valid + span:after {
          content: "✖";
          color: #d02;
        }
        &:valid:not(:placeholder-shown).should-show-valid + span:after {
          content: "✓";
          color: #0b4;
        }
      }
    }
  }
  & > input {
    margin: 20px 0;
    font-family: inherit;
    font-size: 1.2rem;
    background-color: #000;
    border: none;
    color: #fff;
    padding: 4px 12px 8px 12px;
    border-radius: 2px;
    cursor: pointer;
    transition-duration: 500ms;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  }
  .reminder {
    text-align: center;
    font-size: 0.9rem;
    & > a {
      color: #08f;
    }
  }
}
</style>