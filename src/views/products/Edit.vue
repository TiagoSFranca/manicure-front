<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">Editar Produto</span>
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
          <v-col cols="12" sm="12" lg="8" md="8">
            <material-products-card-info
              :isEdit="true"
              :isLoading="loading[LOADING_IDENTIFIER]"
              :object="product"
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

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      LOADING_IDENTIFIER: "searchProduct",
      LOADING_IDENTIFIER_IMAGES: "searchProductImages",
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
    comeBack() {
      this.$router.push({ path: PRODUCTS });
    },
  },
  created() {
    this.searchProduct();
    this.getImages();
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, [
      "product",
      "images",
      "search",
      "searchImages",
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
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
