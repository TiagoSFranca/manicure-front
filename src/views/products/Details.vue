<template>
  <div>
    <v-row align="center">
      <v-col cols="auto" class="mr-auto">
        <span class="title white--text">Visualizar Produto</span>
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
      <v-col cols="12">
        <material-products-card-info
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="product"
          height="600"
        />
      </v-col>
      <v-col cols="12">
        <material-products-card-materials
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER_MATERIALS]"
          :materials="materials"
          height="600"
        />
      </v-col>
      <v-col cols="12">
        <material-products-card-combos
          :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
          :combos="combos"
          height="600"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="6" md="6">
        <v-row>
          <v-col cols="6" sm="6" lg="6" md="6">
            <common-simple-card
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              title="Agendamentos em 2020"
            >
              <span class="title white--text">38</span>
            </common-simple-card>
          </v-col>
          <v-col cols="6" sm="6" lg="6" md="6">
            <common-simple-card
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              title="Agendamentos totais"
            >
              <span class="title white--text">7503</span>
            </common-simple-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <material-products-card-graphs
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              :labels="labels"
              :datasets="datasets"
              title="Agendamentos em 2020"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" lg="6" md="6">
        <v-row>
          <v-col cols="6" sm="6" lg="6" md="6">
            <common-simple-card
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              title="Faturamento em 2020"
            >
              <span class="title white--text">38</span>
            </common-simple-card>
          </v-col>
          <v-col cols="6" sm="6" lg="6" md="6">
            <common-simple-card
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              title="Faturamento total"
            >
              <span class="title white--text">7503</span>
            </common-simple-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <material-products-card-graphs
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              :labels="labels"
              :datasets="datasets"
              title="Faturamento em 2020"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <v-row>
          <v-col cols="6" sm="6" lg="3" md="3">
            <common-simple-card
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              title="Materiais reservados em 2020"
            >
              <span class="title white--text">38</span>
            </common-simple-card>
          </v-col>
          <v-col cols="6" sm="6" lg="3" md="3">
            <common-simple-card
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              title="Materiais usados em 2020"
            >
              <span class="title white--text">7503</span>
            </common-simple-card>
          </v-col>
          <v-col cols="12" sm="12" lg="3" md="3">
            <common-simple-card
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              title="Valores gastos em 2020"
            >
              <span class="title white--text">7503</span>
            </common-simple-card>
          </v-col>
          <v-col cols="12" sm="12" lg="3" md="3">
            <common-simple-card
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              title="Valores gastos totais"
            >
              <span class="title white--text">7503</span>
            </common-simple-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <material-products-card-graphs
              :isLoading="loading[LOADING_IDENTIFIER_COMBOS]"
              :labels="labels"
              :datasets="datasets"
              title="Materiais em 2020"
            />
          </v-col>
        </v-row>
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
  </div>
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
      LOADING_IDENTIFIER_MATERIALS: "searchProductMaterials",
      labels: [
        "jan",
        "feb",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
      ],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f83379",
          data: [this.getRandomInt(), this.getRandomInt()],
        },
        {
          label: "Data Two",
          backgroundColor: "#f87979",
          data: [this.getRandomInt(), this.getRandomInt()],
        },
      ],
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
    comeBack() {
      this.$router.push({ path: PRODUCTS });
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
  created() {
    this.searchProduct();
    this.getImages();
    this.getCombos();
    this.getMaterials();
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
