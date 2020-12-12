<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">{{ $t(PRODUCT.EDIT.NAME) }}</span>
          </v-col>

          <v-col cols="auto" class="ml-auto">
            <v-btn
              color="error"
              elevation="2"
              fab
              outlined
              rounded
              small
              :loading="loading[LOADING_IDENTIFIER]"
              @click="comeBack"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-products-card-info
              :isEdit="true"
              :isLoading="loading[LOADING_IDENTIFIER]"
              :object="product"
              :showActions="true"
            />
          </v-col>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-products-card-materials
              :isEdit="true"
              :isLoading="loading[LOADING_IDENTIFIER_MATERIALS]"
              :materials="materials"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-products-card-images
              :isEdit="true"
              :isLoading="loading[LOADING_IDENTIFIER_IMAGES]"
              :images="images"
            />
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import productsActions from "@/actions/productsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";
import { PRODUCTS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      LOADING_IDENTIFIER: "searchProduct",
      LOADING_IDENTIFIER_IMAGES: "searchProductImages",
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
    getMaterials() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      productsActions.getMaterials(
        id,
        this.source,
        this.LOADING_IDENTIFIER_MATERIALS
      );
    },
    comeBack() {
      this.$router.push({ path: PRODUCTS });
    },
  },
  created() {
    this.searchProduct();
    this.getImages();
    this.getMaterials();
    this.PRODUCT = i18nConstants.PRODUCT;
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, [
      "product",
      "images",
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
