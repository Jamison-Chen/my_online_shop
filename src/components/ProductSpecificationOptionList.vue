<template>
  <div class="product-specification-option-list">
    <label
      class="option"
      :class="{ checked: each === currentSelected }"
      v-for="each in options"
      :key="each"
      :for="groupName"
      >{{ each }}
      <input
        class="option-input"
        type="radio"
        :value="each"
        :name="groupName"
        v-model="currentSelected"
        @change="
          $emit('updateSelection', {
            idx: idxOfParent,
            selection: each,
          })
        "
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    options: {
      type: Set as PropType<Set<string>>,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    defaultSelected: {
      type: String,
      required: true,
    },
    idxOfParent: {
      type: Number,
      required: true,
    },
  },
  emits: ["updateSelection"],
  data() {
    return {
      currentSelected: this.defaultSelected as String,
    };
  },
});
</script>

<style lang="scss" scoped>
.product-specification-option-list {
  display: flex;
  padding: 10px 0;
  .option {
    position: relative;
    margin: 0 10px;
    padding: 6px 12px;
    border-radius: 5px;
    border: 1px solid $noisyWhite;
    &.checked {
      border: 2px solid $black;
      font-weight: bold;
    }
    .option-input[type="radio"] {
      appearance: none;
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      outline: none;
    }
  }
}
</style>