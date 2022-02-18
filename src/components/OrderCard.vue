<template>
  <div class="order-card">
    <div class="header" @click="isFold = !isFold">
      <span class="order-id">Order ID: {{ orderInfo.id }}</span>
      <span class="status" :class="[statusKebab]">{{ status }}</span>
      <IconBase class="toggler" :class="{ fold: isFold }"
        ><IconUpArrow
      /></IconBase>
    </div>
    <div class="body" :class="{ fold: isFold }">
      <div class="row">
        <span class="subtitle">Recipient:</span>{{ orderInfo.name_of_picker }}
      </div>
      <div class="row">
        <span class="subtitle">Contact Number:</span>
        {{ orderInfo.phone_number_of_picker }}
      </div>
      <div class="row">
        <span class="subtitle">Payment Method:</span>
        {{ orderInfo.payment_method }}
      </div>
      <div class="row">
        <span class="subtitle">Address:</span>
        {{ orderInfo.address }}
      </div>
      <table class="row">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Specification</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eachItem in orderInfo.items" :key="eachItem">
            <td>{{ eachItem.product_name }}</td>
            <td>{{ eachItem.product_specification }}</td>
            <td>{{ eachItem.quantity }}</td>
            <td>${{ eachItem.subtotal_costs }}</td>
          </tr>
          <tr class="total-row">
            <td colspan="3" class="total-title">Total + Freight - Coupon</td>
            <td>${{ orderInfo.final_cost }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    height: fit-content;
    min-height: 200px;
    letter-spacing: 1px;
    transition-duration: 300ms;
    &.fold {
      height: 0px;
      min-height: 0px;
    }
    & > .row {
      margin: 10px;
      &.total {
        align-self: flex-end;
      }
      & > .subtitle {
        font-size: 0.85rem;
        color: $gray;
        margin-right: 5px;
      }
    }
    table {
      width: 100%;
      thead > tr {
        border-bottom: 1px solid $gray;
        th {
          color: $gray;
          font-weight: normal;
        }
      }
      tbody > tr {
        &.total-row {
          line-height: 2rem;
          .total-title {
            text-align: end;
            color: $lightGray;
            font-weight: bold;
          }
        }
        // text-align: end;
      }
    }
  }
}
</style>