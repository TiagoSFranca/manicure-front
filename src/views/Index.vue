<template>
  <div>
    <v-row class="mt-3">
      <v-col cols="12">
        <material-index-agenda />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <material-index-cards-warning-stock-materials />
      </v-col>
    </v-row>

    <v-row>
      <v-col md="8" sm="12">
        <material-index-cards-late-schedules />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8" offset-md="4" sm="12" offset-sm="0">
        <material-index-cards-products-on-sale />
      </v-col>
      <v-col md="8" sm="12">
        <material-index-cards-combos-on-sale />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import i18nConstants from "@/i18n/constants";
import axiosSourceToken from "@/utils/axiosSourceToken";

export default {
  data() {
    return {
      source: "",
    };
  },
  computed: {},
  created() {
    this.source = axiosSourceToken.obterToken();
  },
  beforeRouteLeave(to, from, next) {
    console.log("cancel")
    this.source.cancel();
    next();
  },
};
</script>
