<template>
  <div>
    <core-page-title :title="$t(PRODUCT.EDIT.NAME)">
      <v-col cols="auto">
        <v-btn
          color="white"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="{
            name: PRODUCTS_DETAILS.name,
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
          :to="PRODUCTS"
          exact
        >
          <v-icon>{{ PRODUCTS.icon }}</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-products-cards-info
          :isEdit="true"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="product"
          :showActions="true"
        />
      </v-col>
    </v-row>

    <v-row
      :justify="product.onSale ? 'space-between' : 'center'"
      v-if="product"
    >
      <v-col cols="auto" v-if="product.onSale" sm="12" md="auto" lg="auto">
        <v-btn
          elevation="2"
          color="warning"
          outlined
          :loading="loading[LOADING_IDENTIFIER]"
          @click="onShowChangeSale(SALE_STATUS.ANTECIPATE)"
          block
        >
          <v-icon left>mdi-calendar-arrow-left</v-icon>
          {{ $t(PRODUCT.EDIT.LABELS.ANTECIPATE) }}
        </v-btn>
      </v-col>
      <v-col cols="auto" v-if="product.onSale" sm="12" md="auto" lg="auto">
        <v-btn
          elevation="2"
          color="error"
          outlined
          :loading="loading[LOADING_IDENTIFIER]"
          @click="onShowChangeSale(SALE_STATUS.END)"
          block
        >
          <v-icon left>mdi-calendar-remove</v-icon>
          {{ $t(PRODUCT.EDIT.LABELS.END) }}
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
          {{ $t(PRODUCT.EDIT.LABELS.START) }}
        </v-btn>
      </v-col>
      <v-col cols="auto" v-if="product.onSale" sm="12" md="auto" lg="auto">
        <v-btn
          elevation="2"
          color="warning"
          outlined
          :loading="loading[LOADING_IDENTIFIER]"
          @click="onShowChangeSale(SALE_STATUS.EXTEND)"
          block
        >
          <v-icon left>mdi-calendar-arrow-right</v-icon>
          {{ $t(PRODUCT.EDIT.LABELS.EXTEND) }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-products-cards-materials
          :isEdit="true"
          :isLoading="loading[LOADING_IDENTIFIER_MATERIALS]"
          :materials="materials"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-products-cards-images
          :isEdit="true"
          :isLoading="loading[LOADING_IDENTIFIER_IMAGES]"
          :images="images"
        />
      </v-col>
    </v-row>

    <material-products-change-sale
      :showChangeSale="showChangeSale"
      :type="saleType"
      :price="product.price"
      :idProduct="product.id"
      :date="product.endSale"
      @close="showChangeSale = false"
    />
  </div>
</template>

<script>
import productsActions from "@/actions/productsActions";

import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";
import { PRODUCTS, PRODUCTS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import { SALE_STATUS } from "@/utils/constants";

export default {
  data() {
    return {
      showChangeSale: false,
      LOADING_IDENTIFIER: "searchProduct",
      LOADING_IDENTIFIER_IMAGES: "searchProductImages",
      LOADING_IDENTIFIER_MATERIALS: "searchProductMaterials",
      saleType: "",
    };
  },
  methods: {
    searchProduct() {
      let id = this.$route.params.id;
      productsActions.get(id, this.LOADING_IDENTIFIER);
    },
    getImages() {
      let id = this.$route.params.id;
      productsActions.getImages(id, this.LOADING_IDENTIFIER_IMAGES);
    },
    getMaterials() {
      let id = this.$route.params.id;
      productsActions.getMaterials(id, this.LOADING_IDENTIFIER_MATERIALS);
    },
    onShowChangeSale(type) {
      this.showChangeSale = true;
      this.saleType = type;
    },
  },
  created() {
    this.searchProduct();
    this.getImages();
    this.getMaterials();
    this.PRODUCT = i18nConstants.PRODUCT;
    this.SALE_STATUS = SALE_STATUS;
    this.PRODUCTS = PRODUCTS;
    this.PRODUCTS_DETAILS = PRODUCTS_DETAILS;
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
};
</script>
