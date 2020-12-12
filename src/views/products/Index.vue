<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">
              {{ $tc(i18nConstants.PRODUCT.NAME, 2) }}
            </span>
          </v-col>

          <v-col cols="auto" class="ml-auto">
            <v-btn
              color="accent"
              elevation="2"
              fab
              outlined
              rounded
              small
              @click="onShowFilter()"
              :disabled="showFilter"
            >
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              color="accent"
              elevation="2"
              fab
              outlined
              rounded
              small
              @click="showAdd = true"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="products"
              class="elevation-1"
              :loading-text="$t(i18nConstants.LOADING_MESSAGE)"
              hide-default-footer
              :custom-sort="onSort"
              :disable-pagination="true"
              :disable-filtering="true"
              :disable-sort="!!loading[LOADING_IDENTIFIER]"
              :loading="loading[LOADING_IDENTIFIER] === true"
              :multi-sort="false"
            >
              <template v-slot:item.price="{ item }">
                <span>{{ toCurrency(item.price) }}</span>
              </template>
              <template v-slot:item.promotionalPrice="{ item }">
                <span>{{ toCurrency(item.promotionalPrice) }}</span>
              </template>
              <template v-slot:item.endSale="{ item }">
                <span>{{ item.endSale && formatDate(item.endSale) }}</span>
              </template>
              <template v-slot:item.onSale="{ item }">
                <v-simple-checkbox
                  v-model="item.onSale"
                  disabled
                  color="primary"
                ></v-simple-checkbox>
              </template>
              <template v-slot:item.active="{ item }">
                <v-simple-checkbox
                  v-model="item.active"
                  disabled
                  color="primary"
                ></v-simple-checkbox>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  @click="seeItem(item, false)"
                  dark
                  :disabled="loading[LOADING_IDENTIFIER]"
                  >mdi-eye-outline</v-icon
                >
                <v-icon
                  @click="seeItem(item)"
                  color="accent"
                  :disabled="loading[LOADING_IDENTIFIER]"
                  >mdi-pencil-outline</v-icon
                >
                <v-icon
                  @click="deleteItem(item)"
                  color="error"
                  :disabled="loading[LOADING_IDENTIFIER]"
                  >mdi-delete-outline</v-icon
                >
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <core-pagination :page="page" @onPaging="onPaging" />
        <material-products-add :showAdd="showAdd" @fechar="showAdd = false" />
        <material-products-filter
          @onFilter="onFilter"
          :loading="loading[LOADING_IDENTIFIER]"
          :filtered="filter"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import productsActions from "@/actions/productsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import { ToCurrency, formatDate } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";
import { PRODUCTS_EDIT, PRODUCTS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      headers: [
        {
          text: this.$t(i18nConstants.PRODUCT.LIST.NAME),
          align: "start",
          value: "name",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.LIST.PRICE),
          value: "price",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.LIST.PROMOTIONAL_PRICE),
          value: "promotionalPrice",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.LIST.ON_SALE),
          value: "onSale",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.LIST.END_SALE),
          value: "endSale",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.LIST.ACTIVE),
          value: "active",
          align: "center",
        },
        { text: "", value: "actions", align: "end", sortable: false },
      ],
      filter: {},
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchProducts",
      formatDate: formatDate,
    };
  },
  methods: {
    ...mapMutations(productsConstants.MODULE_NAME, [
      productsConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    onShowFilter() {
      this[productsConstants.MUTATION_SET_SHOW_FILTER](true);
    },
    searchProducts() {
      this.source = axiosSourceToken.obterToken();
      productsActions.search(
        this.source,
        this.filter,
        this.pagination,
        this.sort,
        this.LOADING_IDENTIFIER
      );
    },
    onSort(items, index, isDesc) {
      let prevSort = this.sort;

      if (index && index.length > 0) {
        this.sort = {
          orderBy: index[0],
          asc: !isDesc[0],
        };
      }

      if (
        prevSort.orderBy !== this.sort.orderBy ||
        prevSort.asc !== this.sort.asc
      ) {
        this.searchProducts();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchProducts();
    },
    onFilter(filter) {
      this.filter = filter;
      this.searchProducts();
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    seeItem(item, isEdit = true) {
      if (isEdit)
        this.$router.push({ path: PRODUCTS_EDIT.replace(":id", item.id) });
      else
        this.$router.push({ path: PRODUCTS_DETAILS.replace(":id", item.id) });
    },
  },
  created() {
    this.searchProducts();
    this.i18nConstants = { ...i18nConstants };
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, [
      "products",
      "search",
      "showFilter",
      "page",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  watch: {
    search() {
      this.searchProducts();
    },
  },
};
</script>
