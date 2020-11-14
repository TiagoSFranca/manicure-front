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
              :isEdit="false"
              :isLoading="loading[LOADING_IDENTIFIER]"
              :object="product"
            />
          </v-col>
          <v-col cols="12" sm="12" lg="4" md="4">
            <material-products-card-combos
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              :combos="combos"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" lg="6" md="6">
            <v-row>
              <v-col cols="6" sm="6" lg="6" md="6">
                <common-simple-card
                  :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
                  title="Agendamento em 2020"
                >
                  <span class="title white--text">38</span>
                </common-simple-card>
              </v-col>
              <v-col cols="6" sm="6" lg="6" md="6">
                <common-simple-card
                  :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
                  title="Agendamento total"
                >
                  <span class="title white--text">7503</span>
                </common-simple-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <material-products-card-graphs
                  :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
                  :combos="combos"
                  title="Agendamento em 2020"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="12" lg="6" md="6">
            <material-products-card-graphs
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              :combos="combos"
              title="Faturamento em 2020"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-products-card-images
              :isEdit="false"
              :isLoading="loading[LOADING_IDENTIFIER_IMAGES]"
              :images="images"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" lg="6" md="6"> SALES </v-col>
          <v-col cols="12" sm="12" lg="6" md="6"> CHANGES </v-col>
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
      LOADING_IDENTIFIER_COMBOS: "searchProductCombos",
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
    comeBack() {
      this.$router.push({ path: PRODUCTS });
    },
  },
  created() {
    this.searchProduct();
    this.getImages();
    this.getCombos();
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, [
      "product",
      "images",
      "search",
      "searchImages",
      "combos",
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
