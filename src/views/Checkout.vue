<template>
  <div id="checkout-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div class="main">
      <div class="block">
        <div class="title">Orderer's Info</div>
        <div class="form-input-section">
          <FormInput
            :setting="{
              inputName: 'name-of-orderer',
              nameDisplayed: 'Name',
              type: 'text',
              required: false,
              pattern: '.+',
              placeholder: ' ',
              shouldAlert: false,
              disabled: true,
            }"
            :initialValue="userInfo.name"
          />
          <FormInput
            :setting="{
              inputName: 'phone-number-of-orderer',
              nameDisplayed: 'Phone #',
              type: 'tel',
              required: false,
              pattern: '.+',
              placeholder: ' ',
              shouldAlert: false,
              disabled: true,
            }"
            :initialValue="userInfo.phone_number"
          />
          <FormInput
            :setting="{
              inputName: 'email-of-order',
              nameDisplayed: 'Email',
              type: 'email',
              required: false,
              pattern: '.+',
              placeholder: ' ',
              shouldAlert: false,
              disabled: true,
            }"
            :initialValue="userInfo.email"
          />
        </div>
      </div>
      <div class="block">
        <div class="title">
          <span>Receiver's Info</span>
          <span class="info-sync-button" @click="syncInfo">
            Same as Orderer's Info
          </span>
        </div>
        <div class="form-input-section">
          <FormInput
            :setting="{
              inputName: 'name-of-receiver',
              nameDisplayed: 'Name',
              type: 'text',
              required: true,
              pattern: '.{2,32}',
              placeholder: ' ',
              shouldAlert: false,
              disabled: false,
            }"
            :initialValue="receiverInfo.name"
            @input="receiverInfo.name = $event"
          />
          <FormInput
            :setting="{
              inputName: 'phone-number-of-receiver',
              nameDisplayed: 'Phone #',
              type: 'tel',
              required: true,
              pattern: '09[0-9]{8}',
              placeholder: '09XXXXXXXX',
              shouldAlert: false,
              disabled: false,
            }"
            :initialValue="receiverInfo.phone_number"
            @input="receiverInfo.phone_number = $event"
          />
          <FormInput
            :setting="{
              inputName: 'email-of-receiver',
              nameDisplayed: 'Email',
              type: 'email',
              required: true,
              pattern: '[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
              placeholder: ' ',
              shouldAlert: false,
              disabled: false,
            }"
            :initialValue="receiverInfo.email"
            @input="receiverInfo.email = $event"
          />
        </div>
      </div>
      <div class="block">
        <div class="title">Payment Method</div>
        <div class="form-input-section">
          <label for="payment-method">
            Payment Method
            <select name="payment-method" v-model="paymentMethod">
              <option value="cash-on-delivery">Cash on Delivery</option>
              <option value="in-store-pickup">In-Store Pickup</option>
              <option value="home-delivery">Home Delivery</option>
            </select>
          </label>
          <FormInput
            :setting="{
              inputName: 'address',
              nameDisplayed: 'Address',
              type: 'text',
              required: true,
              pattern: '.+',
              placeholder: ' ',
              shouldAlert: false,
              disabled: false,
            }"
            :initialValue="address"
            @input="address = $event"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import FormInput from "@/components/FormInput.vue";
import { PageInfo, UserInfo } from "@/myInterface";
import store from "@/store";

export default defineComponent({
  name: "Checkout",
  store: store,
  components: { CurrentPathBar, FormInput },
  data() {
    return {
      parentPageList: [
        { name: "Home", path: "/" },
        { name: "Cart", path: "/cart" },
      ] as PageInfo[],
      receiverInfo: {} as UserInfo,
      paymentMethod: "" as string,
      address: "" as string,
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([{ name: "Checkout", path: "#" }]);
    },
    userInfo(): UserInfo {
      return store.state.userInfo;
    },
  },
  methods: {
    syncInfo(): void {
      this.receiverInfo = { ...this.userInfo };
    },
  },
});
</script>

<style lang="scss" scoped>
#checkout-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    width: 70%;
    .block {
      text-align: start;
      padding: 20px 0;
      .title {
        font-size: 1.6rem;
        letter-spacing: 1px;
        margin: 10px 0;
        .info-sync-button {
          color: #08f;
          letter-spacing: initial;
          font-size: 0.8rem;
          padding: 2px 4px;
          margin: 0 5px;
          cursor: pointer;
          &:hover {
            color: #07d;
          }
        }
      }
      .form-input-section {
        label {
          display: inline-block;
          select {
            border: 1px solid #aaa;
            border-radius: 2px;
            padding: 3px;
            margin: 10px;
            line-height: 1.4rem;
            font-family: inherit;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}
</style>
