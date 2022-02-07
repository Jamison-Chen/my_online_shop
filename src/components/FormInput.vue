<template>
  <label :for="setting.inputName">
    {{ setting.nameDisplayed }}
    <span class="required-mark">{{ setting.required ? "*" : "" }}</span>
    <input
      :type="setting.type"
      :name="setting.inputName"
      :required="setting.required"
      :pattern="setting.pattern"
      :placeholder="setting.placeholder"
      :class="{ 'should-alert': setting.shouldAlert }"
      :disabled="setting.disabled"
      @input="updateValue"
      :value="initialValue"
    />
  </label>
</template>

<script lang="ts">
import { UserInfoInputSetting } from "@/myInterface";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    setting: {
      type: Object as PropType<UserInfoInputSetting>,
      required: true,
    },
    initialValue: {},
  },
  emits: ["input"],
  data() {
    return {
      localValue: undefined as any,
    };
  },
  methods: {
    updateValue(event: Event): void {
      this.localValue = (event.currentTarget as HTMLInputElement).value;
      this.$emit("input", this.localValue);
    },
  },
});
</script>

<style lang="scss" scoped>
label {
  display: inline-block;
  .required-mark {
    color: #b01;
  }
  & > input {
    border: none;
    border-bottom: 1px solid #aaa;
    margin: 10px;
    line-height: 1.4rem;
    font-family: inherit;
    letter-spacing: 1px;
    &::placeholder {
      color: #ccc;
    }
    &:disabled {
      color: #aaa;
    }
  }
}
</style>