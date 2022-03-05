<template>
  <div id="homepage">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <PictureCarousel :pictureInfoList="updatedCarouselContents" />
    <PageBlock :blockTitle="'All Catrgories'">
      <div id="category-list">
        <CategoryInfoCard
          v-for="each in categories"
          :key="each.id"
          :categoryInfo="each"
        />
      </div>
    </PageBlock>
    <PageBlock :blockTitle="'Popular This Week'"></PageBlock>
    <PageBlock :blockTitle="'New Arrival'"></PageBlock>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PictureCarousel from "@/components/PictureCarousel.vue"; // @ is an alias to /src
import PageBlock from "@/components/PageBlock.vue";
import CategoryInfoCard from "@/components/CategoryInfoCard.vue";
import { CarouselContentInfo, CategoryInfo } from "@/myInterface";
import store from "@/store";

export default defineComponent({
  name: "Homepage",
  store: store,
  components: { PictureCarousel, PageBlock, CategoryInfoCard },
  data() {
    return {
      publicPath:
        process.env.NODE_ENV === "production" ? "/my_online_shop/" : "/",
      carouselContents: [
        {
          image: "#fff4f4",
          href: "search-result?query=top,seller,this,month",
          title: "Top Seller This Month",
        },
        {
          image: "#f4fff4",
          href: "product/24",
          title: "Ad2",
        },
        {
          image: "#f4f4ff",
          href: "product/32",
          title: "Ad3",
        },
      ] as CarouselContentInfo[],
      categories: [] as CategoryInfo[],
    };
  },
  computed: {
    updatedCarouselContents(): CarouselContentInfo[] {
      return this.carouselContents.map((each) => {
        each.href = this.publicPath + each.href;
        return each;
      });
    },
  },
  methods: {
    fetchData(): Promise<any> {
      let endPoint = `${store.state.backendApiUrl}/category/all`;
      return fetch(endPoint, { method: "get", credentials: "include" }).then(
        (res) => res.json()
      );
    },
  },
  async created() {
    this.categories = (await this.fetchData())["data"];
  },
});
</script>


<style lang="scss" scoped>
#homepage {
  display: flex;
  flex-direction: column;
  #category-list {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-items: stretch;
    padding: 30px;
  }
}
</style>