<template>
  <div class="order-card">
    <div class="header" @click="isFold = !isFold">
      <span class="order-id">Order ID: {{ orderInfo.id }}</span>
      <span class="status" :class="[statusKebab]">{{ status }}</span>
      <IconBase class="toggler" :class="{ fold: isFold }"
        ><IconUpArrow
      /></IconBase>
    </div>
    <div class="body" :class="{ fold: isFold }">{{ orderInfo }}</div>
  </div>
</template>

<script lang="ts">
import { OrderInfo } from "@/myInterface";
import { defineComponent, PropType } from "vue";
import IconBase from "./IconBase.vue";
import IconUpArrow from "./icons/IconUpArrow.vue";

export default defineComponent({
  props: {
    orderInfo: {
      type: Object as PropType<OrderInfo>,
      required: true,
    },
  },
  components: { IconBase, IconUpArrow },
  data() {
    return {
      isFold: true as boolean,
    };
  },
  computed: {
    status(): string {
      if (this.orderInfo.picked_up_date !== null) return "Picked Up";
      else if (this.orderInfo.arrived_date !== null) return "Arrived";
      else if (this.orderInfo.shipped_date !== null) return "Shipped";
      else if (this.orderInfo.paid_date !== null) return "Paid";
      else return "Order Received";
    },
    statusKebab(): string {
      if (this.orderInfo.picked_up_date !== null) return "picked-up";
      else if (this.orderInfo.arrived_date !== null) return "arrived";
      else if (this.orderInfo.shipped_date !== null) return "shipped";
      else if (this.orderInfo.paid_date !== null) return "paid";
      else return "order-received";
    },
  },
});
</script>

<style lang="scss" scoped>
.order-card {
  user-select: none;
  padding: 20px 0;
  border-bottom: 1px solid $almostWhite;
  box-sizing: border-box;
  margin: 0 20px;
  & > .header {
    position: relative;
    height: 50px;
    border-radius: 2px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: $almostWhite;
    color: $gray;
    font-size: 0.9rem;
    letter-spacing: 1px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    & > .order-id {
      margin: 0 10px;
    }
    & > .status {
      margin: 0 10px;
      &.order-received {
        color: $lightGray;
      }
      &.paid {
        color: $blue;
      }
      &.shipped {
        color: $green;
      }
      &.arrived {
        color: $red;
      }
      &.picked-up {
        color: $deepGray;
      }
    }
    & > .toggler {
      position: absolute;
      margin: 0 10px;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      transition-duration: 300ms;
      &.fold {
        transform: rotate(180deg) translateY(50%);
      }
    }
  }
  & > .body {
    box-sizing: border-box;
    padding: 20px 0;
    overflow: hidden;
    height: fit-content;
    min-height: 100px;
    transition-duration: 300ms;
    &.fold {
      height: 0px;
      min-height: 0px;
      padding: 0;
    }
  }
}
</style>