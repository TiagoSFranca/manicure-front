<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">Editar Combo</span>
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
            <material-combos-card-info
              :isEdit="true"
              :isLoading="loading[LOADING_IDENTIFIER]"
              :object="combo"
              :showActions="true"
            />
          </v-col>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-combos-card-products
              :isEdit="true"
              :isLoading="loading[LOADING_IDENTIFIER_MATERIALS]"
              :products="products"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-combos-card-images
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
import combosActions from "@/actions/combosActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import { COMBOS } from "@/router/routes";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      LOADING_IDENTIFIER: "searchCombo",
      LOADING_IDENTIFIER_IMAGES: "searchComboImages",
      LOADING_IDENTIFIER_MATERIALS: "searchComboProducts",
    };
  },
  methods: {
    searchCombo() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      combosActions.get(id, this.source, this.LOADING_IDENTIFIER);
    },
    getImages() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      combosActions.getImages(
        id,
        this.source,
        this.LOADING_IDENTIFIER_IMAGES
      );
    },
    getProducts() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      combosActions.getProducts(
        id,
        this.source,
        this.LOADING_IDENTIFIER_MATERIALS
      );
    },
    comeBack() {
      this.$router.push({ path: COMBOS });
    },
  },
  created() {
    this.searchCombo();
    this.getImages();
    this.getProducts();
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
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
