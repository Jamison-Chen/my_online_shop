<template>
  <div id="homepage">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <PictureCarousel :pictureInfoList="carouselContents" />
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
import PictureCarousel, {
  CarouselContentInfo,
} from "@/components/PictureCarousel.vue";
import PageBlock from "@/components/PageBlock.vue";
import CategoryInfoCard, {
  CategoryInfo,
} from "@/components/CategoryInfoCard.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Homepage",
  components: { PictureCarousel, PageBlock, CategoryInfoCard },
  data() {
    return {
      carouselContents: [
        {
          image: "#fff4f4",
          href: "/search-result?query=top,seller,this,month",
          title: "Top Seller This Month",
        },
        { image: "#f4fff4", href: "/product/24", title: "Ad2" },
        { image: "#f4f4ff", href: "/product/32", title: "Ad3" },
      ] as CarouselContentInfo[],
      categories: [] as CategoryInfo[],
    };
  },
  methods: {
    fetchData(): Promise<any> {
      let endPoint = `http://127.0.0.1:8000/api/category/all`;
      return fetch(endPoint).then((res) => res.json());
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