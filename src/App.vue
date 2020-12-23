<template>
  <v-app>
    <v-main v-show="!loading">
      <router-view></router-view>
    </v-main>
    <splash v-if="loading"></splash>
  </v-app>
</template>

<script>
import Splash from "@/components/Splash";

export default {
  name: "App",
  data: () => ({
    loading: true
  }),
  components: {
    Splash
  },
  created() {
    this.$store.dispatch("bindLists");
    setTimeout(() => {
      this.loading = false;
    }, 2100);
  }
};
</script>
