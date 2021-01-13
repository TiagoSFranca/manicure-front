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
        <material-products-card-info
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="product"
        />
      </v-col>
      <v-col cols="12">
        <material-products-card-materials
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER_MATERIALS]"
          :materials="materials"
        />
      </v-col>
      <v-col cols="12">
        <material-products-card-combos
          :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
          :combos="combos"
        />
      </v-col>
      <v-col cols="12">
        <material-products-card-images
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER_IMAGES]"
          :images="images"
        />
      </v-col>
    </v-row>

    <v-divider />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-products-card-sales />
      </v-col>
    </v-row>
    <v-divider />
    <material-products-card-graphs />
    <v-divider />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-products-card-schedules />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import productsActions from "@/actions/productsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";
import { PRODUCTS, PRODUCTS_EDIT } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      source: "",
      LOADING_IDENTIFIER: "searchProduct",
      LOADING_IDENTIFIER_IMAGES: "searchProductImages",
      LOADING_IDENTIFIER_COMBOS: "searchProductCombos",
      LOADING_IDENTIFIER_MATERIALS: "searchProductMaterials",
    };
  },
  methods: {
    searchProduct() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      productsActions.get(id, this.source, this.LOADING_IDENTIFIER);
    },
    getImages() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      productsActions.getImages(
        id,
        this.source,
        this.LOADING_IDENTIFIER_IMAGES
      );
    },
    getCombos() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      productsActions.getCombos(
        id,
        this.source,
        this.LOADING_IDENTIFIER_COMBOS
      );
    },
    getMaterials() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      productsActions.getMaterials(
        id,
        this.source,
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
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
