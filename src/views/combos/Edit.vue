<template>
  <div>
    <core-page-title :title="$t(COMBO.EDIT.NAME)">
      <v-col cols="auto">
        <v-btn
          color="white"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="{
            name: COMBOS_DETAILS.name,
            params: { id: $route.params.id },
          }"
          exact
        >
          <v-icon>mdi-eye</v-icon>
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
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-combos-cards-info
          :isEdit="true"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="combo"
          :showActions="true"
        />
      </v-col>
    </v-row>

    <v-row :justify="combo.onSale ? 'space-between' : 'center'" v-if="combo">
      <v-col cols="auto" v-if="combo.onSale" sm="12" md="auto" lg="auto">
        <v-btn
          elevation="2"
          color="warning"
          outlined
          :loading="loading[LOADING_IDENTIFIER]"
          @click="onShowChangeSale(SALE_STATUS.ANTECIPATE)"
          block
        >
          <v-icon left>mdi-calendar-arrow-left</v-icon>
          {{ $t(COMBO.EDIT.LABELS.ANTECIPATE) }}
        </v-btn>
      </v-col>
      <v-col cols="auto" v-if="combo.onSale" sm="12" md="auto" lg="auto">
        <v-btn
          elevation="2"
          color="error"
          outlined
          :loading="loading[LOADING_IDENTIFIER]"
          @click="onShowChangeSale(SALE_STATUS.END)"
          block
        >
          <v-icon left>mdi-calendar-remove</v-icon>
          {{ $t(COMBO.EDIT.LABELS.END) }}
        </v-btn>
      </v-col>
      <v-col cols="auto" v-else sm="12" md="auto" lg="auto">
        <v-btn
          elevation="2"
          color="accent"
          outlined
          :loading="loading[LOADING_IDENTIFIER]"
          @click="onShowChangeSale(SALE_STATUS.START)"
          block
        >
          <v-icon left>mdi-calendar-plus</v-icon>
          {{ $t(COMBO.EDIT.LABELS.START) }}
        </v-btn>
      </v-col>
      <v-col cols="auto" v-if="combo.onSale" sm="12" md="auto" lg="auto">
        <v-btn
          elevation="2"
          color="warning"
          outlined
          :loading="loading[LOADING_IDENTIFIER]"
          @click="onShowChangeSale(SALE_STATUS.EXTEND)"
          block
        >
          <v-icon left>mdi-calendar-arrow-right</v-icon>
          {{ $t(COMBO.EDIT.LABELS.EXTEND) }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-combos-cards-products
          :isEdit="true"
          :isLoading="loading[LOADING_IDENTIFIER_MATERIALS]"
          :products="products"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-combos-cards-images
          :isEdit="true"
          :isLoading="loading[LOADING_IDENTIFIER_IMAGES]"
          :images="images"
        />
      </v-col>
    </v-row>

    <material-combos-change-sale
      :showChangeSale="showChangeSale"
      :type="saleType"
      :price="combo.price"
      :idCombo="combo.id"
      :date="combo.endSale"
      @close="showChangeSale = false"
    />
  </div>
</template>

<script>
import combosActions from "@/actions/combosActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import { COMBOS, COMBOS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import { SALE_STATUS } from "@/utils/constants";

export default {
  data() {
    return {
      showChangeSale: false,
      source: "",
      LOADING_IDENTIFIER: "searchCombo",
      LOADING_IDENTIFIER_IMAGES: "searchComboImages",
      LOADING_IDENTIFIER_MATERIALS: "searchComboProducts",
      saleType: "",
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
        this.LOADING_IDENTIFIER_MATERIALS
      );
    },
    onShowChangeSale(type) {
      this.showChangeSale = true;
      this.saleType = type;
    },
  },
  created() {
    this.searchCombo();
    this.getImages();
    this.getProducts();
    this.COMBO = i18nConstants.COMBO;
    this.SALE_STATUS = SALE_STATUS;
    this.COMBOS = COMBOS;
    this.COMBOS_DETAILS = COMBOS_DETAILS;
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
