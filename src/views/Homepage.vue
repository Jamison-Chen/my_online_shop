<template>
  <div id="homepage">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <PictureCarousel :pictureInfoList="homeCoverPictures" />
    <div id="category-list">
      <CategoryInfoCard
        v-for="each in categories"
        :key="each.id"
        :categoryInfo="each"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PictureCarousel from "@/components/PictureCarousel.vue";
import CategoryInfoCard from "@/components/CategoryInfoCard.vue"; // @ is an alias to /src

interface PictureInfo {
  image: any;
  href: string;
  title: string;
}

interface CategoryInfo {
  id: string;
  name: string;
}

export default defineComponent({
  name: "Homepage",
  components: { PictureCarousel, CategoryInfoCard },
  data() {
    return {
      homeCoverPictures: [] as PictureInfo[],
      categories: [] as CategoryInfo[],
    };
  },
  methods: {
    async fetchData(): Promise<any> {
      let endPoint = `http://127.0.0.1:8000/api/category/all`;
      return await fetch(endPoint).then((res) => res.json());
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
    padding: 0 30px;
  }
}
</style>