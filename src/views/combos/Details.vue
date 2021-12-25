<template>
  <div>
    <core-page-title :title="$t(COMBO.DETAILS.NAME)">
      <v-col cols="auto">
        <v-btn
          color="accent"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="{
            name: COMBOS_EDIT.name,
            params: { id: $route.params.id },
          }"
          exact
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="COMBOS"
          exact
        >
          <v-icon>{{ COMBOS.icon }}</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>

    <v-row>
      <v-col cols="12">
        <material-combos-cards-info
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="combo"
          height="600"
        />
      </v-col>
      <v-col cols="12">
        <material-combos-cards-products
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER_PRODUCTS]"
          :products="products"
          height="600"
        />
      </v-col>
      <v-col cols="12">
        <material-combos-cards-images
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER_IMAGES]"
          :images="images"
        />
      </v-col>
    </v-row>

    <v-divider />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-combos-cards-sales />
      </v-col>
    </v-row>
    <v-divider />
    <material-combos-cards-graphs />
    <v-divider />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-combos-cards-schedules />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import combosActions from "@/actions/combosActions";

import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import { COMBOS, COMBOS_EDIT } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      LOADING_IDENTIFIER: "searchCombo",
      LOADING_IDENTIFIER_IMAGES: "searchComboImages",
      LOADING_IDENTIFIER_COMBOS: "searchComboCombos",
      LOADING_IDENTIFIER_PRODUCTS: "searchComboProducts",
    };
  },
  methods: {
    searchCombo() {
      let id = this.$route.params.id;
      combosActions.get(id, this.LOADING_IDENTIFIER);
    },
    getImages() {
      let id = this.$route.params.id;
      combosActions.getImages(id, this.LOADING_IDENTIFIER_IMAGES);
    },
    getProducts() {
      let id = this.$route.params.id;
      combosActions.getProducts(id, this.LOADING_IDENTIFIER_PRODUCTS);
    },
  },
  created() {
    this.searchCombo();
    this.getImages();
    this.getProducts();
    this.COMBO = i18nConstants.COMBO;
    this.COMBOS = COMBOS;
    this.COMBOS_EDIT = COMBOS_EDIT;
  },
  computed: {
    ...mapState(combosConstants.MODULE_NAME, [
      "combo",
      "images",
      "products",
      "search",
      "searchImages",
      "searchProducts",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    search() {
      this.searchCombo();
    },
    searchImages() {
      this.getImages();
    },
    searchProducts() {
      this.getProducts();
    },
  },
};
</script>
