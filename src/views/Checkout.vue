<template>
  <div id="checkout-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <div class="main">
      <div class="info-of-orderer block">
        <div class="title">Orderer's Info</div>
        <div class="form-input-section">
          <label for="name-of-orderer">
            Name
            <input
              type="text"
              name="name-of-orderer"
              :value="userInfo.name"
              disabled
            />
          </label>
          <label for="phone-number-of-orderer">
            Phone #
            <input
              type="text"
              name="phone-number-of-orderer"
              :value="userInfo.phone_number"
              disabled
            />
          </label>
          <label for="email-of-order">
            Email
            <input
              type="text"
              name="email-of-order"
              :value="userInfo.email"
              disabled
            />
          </label>
        </div>
      </div>
      <div class="info-of-receiver block">
        <div class="title">
          <span>Receiver's Info</span>
          <span>
            <input type="button" value="Same as Orderer's Info" />
          </span>
        </div>
        <div class="form-input-section">
          <label for="name-of-orderer">
            Name
            <input type="text" name="name-of-orderer" :value="userInfo.name" />
          </label>
          <label for="phone-number-of-orderer">
            Phone #
            <input
              type="text"
              name="phone-number-of-orderer"
              :value="userInfo.phone_number"
            />
          </label>
          <label for="email-of-order">
            Email
            <input type="text" name="email-of-order" :value="userInfo.email" />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import { PageInfo, UserInfo } from "@/myInterface";
import store from "@/store";

export default defineComponent({
  name: "Checkout",
  store: store,
  components: { CurrentPathBar },
  data() {
    return {
      parentPageList: [
        { name: "Home", path: "/" },
        { name: "Cart", path: "/cart" },
      ] as PageInfo[],
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
});
</script>

<style lang="scss" scoped>
#checkout-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  .main {
    width: 80%;
    .block {
      text-align: start;
      padding: 20px 0;
      .title {
        font-size: 1.6rem;
        letter-spacing: 1px;
        margin: 10px 0;
      }
      .form-input-section {
        & > label {
          & > input {
            border: none;
            border-bottom: 1px solid #aaa;
            margin: 10px;
            line-height: 1.4rem;
            font-family: inherit;
            letter-spacing: 1px;
            &:disabled {
              color: #aaa;
            }
          }
        }
      }
    }
  }
}
</style>
