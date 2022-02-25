<template>
  <label :for="setting.inputName" :class="[displayType]">
    <span>{{ setting.nameDisplayed }}</span>
    <span class="required-mark">{{ setting.required ? "*" : "" }}</span>
    <input
      :type="setting.type"
      :name="setting.inputName"
      :required="setting.required"
      :pattern="setting.pattern"
      :placeholder="setting.placeholder"
      :class="{ 'should-alert': setting.shouldAlert }"
      :disabled="setting.disabled"
      @input="(e) => updateValue(e, setting.inputName)"
      @change="(e) => updateValue(e, setting.inputName)"
      :value="initialValue"
      :size="inputSize"
    />
    <span class="alter-mark"></span>
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
    initialValue: {
      type: String,
      required: true,
    },
    displayType: {
      type: String as PropType<"inline-block" | "table">,
      required: true,
    },
  },
  emits: ["input"],
  computed: {
    inputSize(): number {
      if (this.$route.path.indexOf("/checkout") !== -1) {
        if (this.setting.inputName === "address") return 55;
        else if (this.setting.type === "tel") return 15;
        else if (this.setting.type === "email") return 30;
      }
      return 20;
    },
  },
  methods: {
    updateValue(event: Event, inputName: string): void {
      this.$emit("input", {
        inputName: inputName,
        value: (event.currentTarget as HTMLInputElement).value,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
label {
  &.inline-block {
    display: inline-block;
    max-width: 100%;
  }
  &.table {
    display: table-row;
    width: 100%;
  }
  &.table > span {
    display: table-cell;
    text-align: start;
    vertical-align: middle;
  }
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
    &::placeholder {
      color: $noisyWhite;
    }
    &:disabled {
      color: $gray;
    }
    & + .alter-mark::after {
      content: "✖";
      color: transparent;
    }
    &.should-alert {
      &:invalid {
        outline-color: $lightRed;
        & + .alter-mark::after {
          color: $lightRed;
        }
      }
    }
  }
  &.inline-block > input {
    max-width: 100%;
  }
  &.table > input {
    display: table-cell;
  }
}
</style>