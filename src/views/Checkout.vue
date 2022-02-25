<template>
  <div id="checkout-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div class="main">
      <div class="block">
        <div class="title">Orderer's Info</div>
        <div class="form-input-section">
          <FormInput
            :setting="{
              inputName: 'name_of_orderer',
              nameDisplayed: 'Name',
              type: 'text',
              required: false,
              pattern: '.+',
              placeholder: ' ',
              shouldAlert: false,
              disabled: true,
            }"
            :initialValue="userInfo.name"
            :displayType="formInputDisplayType"
          />
          <FormInput
            :setting="{
              inputName: 'phone_number_of_orderer',
              nameDisplayed: 'Phone #',
              type: 'tel',
              required: false,
              pattern: '.+',
              placeholder: ' ',
              shouldAlert: false,
              disabled: true,
            }"
            :initialValue="userInfo.phone_number"
            :displayType="formInputDisplayType"
          />
          <FormInput
            :setting="{
              inputName: 'email_of_order',
              nameDisplayed: 'Email',
              type: 'email',
              required: false,
              pattern: '.+',
              placeholder: ' ',
              shouldAlert: false,
              disabled: true,
            }"
            :initialValue="userInfo.email"
            :displayType="formInputDisplayType"
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
              inputName: 'name_of_receiver',
              nameDisplayed: 'Name',
              type: 'text',
              required: true,
              pattern: '.{2,32}',
              placeholder: ' ',
              shouldAlert: false,
              disabled: false,
            }"
            :initialValue="receiverInfo.name"
            :displayType="formInputDisplayType"
            @input="receiverInfo.name = $event.value"
          />
          <FormInput
            :setting="{
              inputName: 'phone_number_of_receiver',
              nameDisplayed: 'Phone #',
              type: 'tel',
              required: true,
              pattern: '09[0-9]{8}',
              placeholder: '09XXXXXXXX',
              shouldAlert: false,
              disabled: false,
            }"
            :initialValue="receiverInfo.phone_number"
            :displayType="formInputDisplayType"
            @input="receiverInfo.phone_number = $event.value"
          />
        </div>
      </div>
      <div class="block">
        <div class="title">Payment Method</div>
        <div class="form-input-section">
          <label for="payment-method" class="payment-method-menu">
            Pickup Method
            <select
              name="payment-method"
              v-model="paymentMethod"
              @change="clearFormerSelection"
            >
              <option value="" hidden disabled>Please Select One</option>
              <option value="Cash On Delivery">Cash on Delivery</option>
              <option value="In-store Pickup">In-Store Pickup</option>
              <option value="Home Delivery">Home Delivery</option>
            </select>
          </label>
          <FormInput
            v-if="paymentMethod === 'Home Delivery'"
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
            :displayType="formInputDisplayType"
            @input="address = $event.value"
          />
          <div
            class="store-link-list"
            v-if="
              (paymentMethod === 'Cash On Delivery' ||
                paymentMethod === 'In-store Pickup') &&
              pickupStoreInfo.address === ''
            "
          >
            <a href="#" class="store-link" @click="setStoreInfo('7-11')"
              >7-11</a
            >
            <a href="#" class="store-link" @click="setStoreInfo('FamilyMart')"
              >FamilyMart</a
            >
            <a href="#" class="store-link" @click="setStoreInfo('OK')">OK</a>
          </div>
          <div
            class="store-to-pickup"
            v-if="
              (paymentMethod === 'Cash On Delivery' ||
                paymentMethod === 'In-store Pickup') &&
              this.pickupStoreInfo.address !== ''
            "
          >
            <FormInput
              :setting="{
                inputName: 'store_to_pickup',
                nameDisplayed: 'Store to pickup',
                type: 'text',
                required: false,
                pattern: '.+',
                placeholder: ' ',
                shouldAlert: false,
                disabled: true,
              }"
              :initialValue="pickupStoreInfo.address"
              :displayType="formInputDisplayType"
            />
            <span
              class="re-choose-store-button"
              @click="pickupStoreInfo.address = ''"
            >
              Choose Again
            </span>
          </div>
        </div>
      </div>
      <div
        class="submit-button-bar"
        v-if="paymentMethod === 'Cash On Delivery'"
      >
        <button
          class="submit-button"
          :disabled="!canSubmitWithoutPaying"
          @click="submit"
        >
          Submit
        </button>
      </div>
      <div
        class="submit-button-bar"
        v-else-if="
          paymentMethod === 'In-store Pickup' ||
          paymentMethod === 'Home Delivery'
        "
      >
        <button
          class="submit-button"
          :disabled="!canSubmitAndPay"
          @click="submit"
        >
          Submit and Pay with Credit Card
        </button>
        <button
          class="submit-button"
          :disabled="!canSubmitAndPay"
          @click="submit"
        >
          Submit and Pay via ATM Transfer
        </button>
      </div>
    </div>
  </div>
  <MessageBox
    :isActive="shouldShowMessageBox"
    :message="statusResponded"
    type="warning"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import FormInput from "@/components/FormInput.vue";
import MessageBox from "@/components/MessageBox.vue";
import { PageInfo, UserInfo, ReceiverInfo } from "@/myInterface";
import store from "@/store";

export default defineComponent({
  name: "Checkout",
  store: store,
  components: { CurrentPathBar, FormInput, MessageBox },
  data() {
    return {
      parentPageList: [
        { name: "Home", path: "/" },
        { name: "Cart", path: "/cart" },
      ] as PageInfo[],
      receiverInfo: {
        name: "",
        phone_number: "",
      } as ReceiverInfo,
      paymentMethod: "" as string,
      address: "" as string,
      pickupStoreInfo: { address: "" } as any,
      shouldShowMessageBox: false as boolean,
      statusResponded: "" as string,
      formInputDisplayType: "inline-block",
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([{ name: "Checkout", path: "#" }]);
    },
    userInfo(): UserInfo {
      return store.state.userInfo;
    },
    canSubmitWithoutPaying(): boolean {
      return (
        this.paymentMethod === "Cash On Delivery" &&
        this.pickupStoreInfo.address !== ""
      );
    },
    canSubmitAndPay(): boolean {
      return (
        (this.paymentMethod === "Home Delivery" && this.address !== "") ||
        (this.paymentMethod === "In-store Pickup" &&
          this.pickupStoreInfo.address !== "")
      );
    },
  },
  methods: {
    async checkCanCheckout(): Promise<void> {
      let statusCode = await fetch(`${store.state.backendApiUrl}/order`, {
        method: "get",
        credentials: "include",
      }).then((resp) => resp.status);
      if (statusCode === 404 || statusCode === 500) {
        this.$router.push({
          name: "Error",
          params: { statusCode: statusCode },
        });
      }
    },
    syncInfo(): void {
      this.receiverInfo = {
        name: this.userInfo.name,
        phone_number: this.userInfo.phone_number,
      };
    },
    setStoreInfo(address: string): void {
      this.pickupStoreInfo.address = address;
    },
    clearFormerSelection(): void {
      this.pickupStoreInfo.address = "";
    },
    async submit(): Promise<void> {
      let requestBody = new URLSearchParams();
      requestBody.append("operation", "create");
      if (this.receiverInfo.name) {
        requestBody.append("name_of_picker", this.receiverInfo.name);
      }
      if (this.receiverInfo.phone_number) {
        requestBody.append(
          "phone_number_of_picker",
          this.receiverInfo.phone_number
        );
      }
      if (this.paymentMethod) {
        requestBody.append("payment_method", this.paymentMethod);
      }
      let addr =
        this.paymentMethod === "Home Delivery"
          ? this.address
          : this.pickupStoreInfo.address;
      if (addr) requestBody.append("address", addr);
      let response = await fetch(`${store.state.backendApiUrl}/order`, {
        method: "post",
        body: requestBody,
        credentials: "include",
      }).then((resp) => resp);
      if (response.status === 404 || response.status === 500) {
        this.$router.push({
          name: "Error",
          params: { statusCode: response.status },
        });
      } else {
        let status = ((await response.json()) as any)["status"];
        if (status === "succeeded") window.location.replace("/thank-you");
        else {
          setTimeout(() => {
            this.statusResponded = status;
            this.shouldShowMessageBox = true;
            setTimeout(() => {
              this.shouldShowMessageBox = false;
            }, 1500);
          }, 100);
        }
      }
    },
  },
  async created() {
    await this.checkCanCheckout();
  },
  // react to route changes
  async beforeRouteUpdate(to, from) {
    await this.checkCanCheckout();
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
          color: $lightBlue;
          letter-spacing: initial;
          font-size: 0.8rem;
          padding: 2px 4px;
          margin: 0 5px;
          cursor: pointer;
          &:hover {
            color: $blue;
          }
        }
      }
      .form-input-section {
        label {
          display: inline-block;
          select {
            border: 1px solid $lightGray;
            border-radius: 2px;
            padding: 3px;
            margin: 10px;
            line-height: 1.4rem;
            font-family: inherit;
            letter-spacing: 1px;
          }
        }
        .payment-method-menu {
          display: block;
        }
        .store-link-list {
          display: flex;
          .store-link {
            padding: 10px 15px;
            letter-spacing: 1px;
            border-radius: 5px;
            border: 1px solid $lightGray;
            margin-right: 20px;
            &:hover {
              border-color: $gray;
            }
          }
        }
        .store-to-pickup {
          .re-choose-store-button {
            color: $lightBlue;
            font-size: 0.8rem;
            padding: 2px 4px;
            margin: 0 5px;
            cursor: pointer;
            &:hover {
              color: $blue;
            }
          }
        }
      }
    }
    .submit-button-bar {
      button {
        font-family: inherit;
        font-size: 1rem;
        letter-spacing: 1px;
        display: block;
        margin: 20px 0;
        padding: 6px 10px;
        background-color: $black;
        color: $white;
        border-radius: 2px;
        border: 1px solid $black;
        transition-duration: 500ms;
        &:hover:not(:disabled) {
          background-color: $white;
          color: $black;
          border-color: $lightGray;
        }
        &:disabled {
          background-color: $lightGray;
          border-color: $lightGray;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
