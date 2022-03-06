<template>
  <div id="track-order-page">
    <CurrentPathBar :parentPageList="fullPathList" />
    <OrderCard
      v-for="eachOrder in orders"
      :key="eachOrder.id"
      :orderInfo="eachOrder"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import CurrentPathBar from "@/components/CurrentPathBar.vue";
import OrderCard from "@/components/OrderCard.vue";
import { OrderInfo, PageInfo } from "@/myInterface";

export default defineComponent({
  name: "TrackOrderPage",
  store: store,
  components: { CurrentPathBar, OrderCard },
  data() {
    return {
      parentPageList: [
        {
          name: "Home",
          path: "",
        },
        {
          name: "Account Center",
          path: "account-center",
        },
      ] as PageInfo[],
      orders: [] as OrderInfo[],
    };
  },
  computed: {
    fullPathList(): PageInfo[] {
      return this.parentPageList.concat([
        {
          name: "My Order",
          path: "./#",
        },
      ]);
    },
  },
  methods: {
    fetchData(): Promise<any> {
      let rqBody = new URLSearchParams();
      rqBody.append("operation", "read");
      return fetch(`${store.state.backendApiUrl}/order`, {
        method: "post",
        body: rqBody,
        credentials: "include",
      }).then((res) => res.json());
    },
  },
  async created() {
    this.orders = (await this.fetchData())["data"];
  },
  async beforeRouteUpdate(to, from) {
    // react to route changes
    this.orders = (await this.fetchData())["data"];
  },
});
</script>

<style lang="scss" scoped>
#track-order-page {
  min-height: 100vh;
  a {
    display: block;
    margin: 15px auto;
    color: $lightBlue;
    cursor: pointer;
    width: fit-content;
    &:hover {
      color: $blue;
    }
  }
  #logout-button {
    margin: 10px 0 20px 0;
    font-family: inherit;
    font-size: 1.2rem;
    background-color: $black;
    border: none;
    color: $white;
    padding: 4px 12px 8px 12px;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>