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
        <material-combos-card-info
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="combo"
          height="600"
        />
      </v-col>
      <v-col cols="12">
        <material-combos-card-products
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER_PRODUCTS]"
          :products="products"
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
            <material-combos-card-graphs
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
            <material-combos-card-graphs
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
            <material-combos-card-graphs
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
        <material-combos-card-images
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
      LOADING_IDENTIFIER_COMBOS: "searchComboCombos",
      LOADING_IDENTIFIER_PRODUCTS: "searchComboProducts",
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
    searchCombo() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      combosActions.get(id, this.source, this.LOADING_IDENTIFIER);
    },
    getImages() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      combosActions.getImages(id, this.source, this.LOADING_IDENTIFIER_IMAGES);
    },
    getProducts() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      combosActions.getProducts(
        id,
        this.source,
        this.LOADING_IDENTIFIER_PRODUCTS
      );
    },
    comeBack() {
      this.$router.push({ path: COMBOS });
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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
