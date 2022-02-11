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
      :size="inputSize"
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
  computed: {
    inputSize(): number {
      if (this.setting.inputName === "address") return 55;
      else if (this.setting.type === "tel") return 15;
      else if (this.setting.type === "email") return 30;
      else return 20;
    },
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
  max-width: 100%;
  .required-mark {
    color: $lightRed;
  }
  & > input {
    border: none;
    border-bottom: 1px solid $lightGray;
    margin: 10px;
    line-height: 1.4rem;
    font-family: inherit;
    letter-spacing: 1px;
    max-width: 100%;
    &::placeholder {
      color: $noisyWhite;
    }
    &:disabled {
      color: $gray;
    }
  }
}
</style>