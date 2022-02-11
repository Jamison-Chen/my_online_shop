<template>
  <div id="user-form">
    <div class="brand-icon"></div>
    <div class="input-table">
      <div class="input-row" v-for="each in fields" :key="each.inputName">
        <label :for="each.inputName">{{ each.nameDisplayed }}</label>
        <span class="required-mark">{{ each.required ? "*" : "" }}</span>
        <input
          :type="each.type"
          :name="each.inputName"
          :required="each.required"
          :pattern="each.pattern"
          :placeholder="each.placeholder"
          :class="{ 'should-alert': each.shouldAlert }"
          :disabled="each.disabled"
          @input="
            $emit('input', {
              inputName: each.inputName,
              value: localFormData[each.inputName],
            })
          "
          v-model="formData[each.inputName]"
        />
        <span class="alter-mark"></span>
      </div>
    </div>
    <div class="alert-message" v-show="alertMessage !== ''">
      {{ alertMessage }}
    </div>
    <input
      type="button"
      :value="pageType"
      @click="$emit('clickSubmitButton')"
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
import { UserInfoInputSetting } from "@/myInterface";

export default defineComponent({
  props: {
    fields: {
      type: Array as PropType<UserInfoInputSetting[]>,
      required: true,
    },
    formData: {
      type: Object as any,
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
    alertMessage: {
      type: String,
      required: true,
    },
  },
  emits: ["input", "clickSubmitButton"],
  computed: {
    localFormData(): any {
      return this.formData;
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
    & > .input-row {
      width: 100%;
      display: table-row;
      label,
      span {
        display: table-cell;
        text-align: start;
        vertical-align: middle;
      }
      .required-mark {
        color: $lightRed;
      }
      & > input {
        display: table-cell;
        border: none;
        border-bottom: 1px solid $lightGray;
        margin: 10px;
        line-height: 1.4rem;
        font-family: inherit;
        letter-spacing: 1px;
        &::placeholder {
          color: $noisyWhite;
        }
        & + span.alter-mark::after {
          content: "✖";
          color: transparent;
        }
        &.should-alert {
          &:invalid {
            outline-color: $lightRed;
            & + span.alter-mark::after {
              color: $lightRed;
            }
          }
        }
      }
    }
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