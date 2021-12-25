<template>
  <div>
    <core-page-title :title="$t(PRODUCT.DETAILS.NAME)">
      <v-col cols="auto">
        <v-btn
          color="accent"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="{
            name: PRODUCTS_EDIT.name,
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
          :to="PRODUCTS"
          exact
        >
          <v-icon>{{ PRODUCTS.icon }}</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>

    <v-row>
      <v-col cols="12">
        <material-products-cards-info
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="product"
        />
      </v-col>
      <v-col cols="12">
        <material-products-cards-materials
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER_MATERIALS]"
          :materials="materials"
        />
      </v-col>
      <v-col cols="12">
        <material-products-cards-combos
          :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
          :combos="combos"
        />
      </v-col>
      <v-col cols="12">
        <material-products-cards-images
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER_IMAGES]"
          :images="images"
        />
      </v-col>
    </v-row>

    <v-divider />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-products-cards-sales />
      </v-col>
    </v-row>
    <v-divider />
    <material-products-cards-graphs />
    <v-divider />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-products-cards-schedules />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import productsActions from "@/actions/productsActions";

import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";
import { PRODUCTS, PRODUCTS_EDIT } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      LOADING_IDENTIFIER: "searchProduct",
      LOADING_IDENTIFIER_IMAGES: "searchProductImages",
      LOADING_IDENTIFIER_COMBOS: "searchProductCombos",
      LOADING_IDENTIFIER_MATERIALS: "searchProductMaterials",
    };
  },
  methods: {
    searchProduct() {
      let id = this.$route.params.id;
      productsActions.get(id, this.LOADING_IDENTIFIER);
    },
    getImages() {
      let id = this.$route.params.id;
      productsActions.getImages(
        id,

        this.LOADING_IDENTIFIER_IMAGES
      );
    },
    getCombos() {
      let id = this.$route.params.id;
      productsActions.getCombos(
        id,

        this.LOADING_IDENTIFIER_COMBOS
      );
    },
    getMaterials() {
      let id = this.$route.params.id;
      productsActions.getMaterials(
        id,

        this.LOADING_IDENTIFIER_MATERIALS
      );
    },
  },
  created() {
    this.searchProduct();
    this.getImages();
    this.getCombos();
    this.getMaterials();
    this.PRODUCT = i18nConstants.PRODUCT;
    this.PRODUCTS = PRODUCTS;
    this.PRODUCTS_EDIT = PRODUCTS_EDIT;
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, [
      "product",
      "images",
      "combos",
      "materials",
      "search",
      "searchImages",
      "searchMaterials",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    search() {
      this.searchProduct();
    },
    searchImages() {
      this.getImages();
    },
    searchMaterials() {
      this.getMaterials();
    },
  },
};
</script>
