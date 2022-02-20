<template>
  <div id="error">
    <h1 v-if="statusCode === 404">Page Not Found!</h1>
    <h1 v-else-if="statusCode === 500">Server Error!</h1>
    <h1 v-else>Unknown Error!</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error",
  data() {
    return {
      statusCode: NaN,
    };
  },
  created() {
    this.statusCode = parseInt(this.$route.params.statusCode as string);
  },
  beforeRouteUpdate(to, from) {
    // react to route changes
    this.statusCode = parseInt(this.$route.params.statusCode as string);
  },
});
</script>


<style lang="scss" scoped>
</style>