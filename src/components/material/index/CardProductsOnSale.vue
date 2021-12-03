<template>
  <div>
    <v-row class="fill-height">
      <v-col>
        <v-card
          :loading="loading[LOADING_IDENTIFIER]"
          :disabled="loading[LOADING_IDENTIFIER]"
        >
          <v-card-title>
            <span class="overline">
              {{ $tc(i18nConstants.PRODUCT.ON_SALE_NAME, 2) }}
            </span>
            <v-spacer />
            <v-btn
              color="accent"
              icon
              large
              @click="onShowFilter()"
              :disabled="showFilter"
            >
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="onSaleProducts"
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
                  <template v-slot:item.active="{ item }">
                    <v-simple-checkbox
                      v-model="item.active"
                      disabled
                      color="primary"
                    ></v-simple-checkbox>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn
                      icon
                      :disabled="loading[LOADING_IDENTIFIER]"
                      :to="{
                        name: PRODUCTS_DETAILS.name,
                        params: { id: item.id },
                      }"
                      small
                    >
                      <v-icon>mdi-eye-outline</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="accent"
                      :disabled="loading[LOADING_IDENTIFIER]"
                      :to="{
                        name: PRODUCTS_EDIT.name,
                        params: { id: item.id },
                      }"
                      small
                    >
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
            <core-pagination :page="onSalePage" @onPaging="onPaging" />
            <material-index-filter-products-on-sale
              @onFilter="onFilter"
              :loading="loading[LOADING_IDENTIFIER]"
              :filtered="filter"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
      showDialog: false,
      title: "",
      message: "",
      productSelected: {},
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
      LOADING_IDENTIFIER: "searchOnSaleProducts",
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
      productsActions.searchOnSale(
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
    deleteItem(item) {
      this.showDialog = true;

      var message = item.active
        ? this.i18nConstants.PRODUCT.LIST.MESSAGES.CONFIRM_DELETE
        : this.i18nConstants.PRODUCT.LIST.MESSAGES.CONFIRM_RESTORE;

      this.message = this.$t(message.MESSAGE);
      this.title = this.$t(message.TITLE);

      this.productSelected = item;
    },
    confirmDialog() {
      this.showDialog = false;
      productsActions.toggleActive(
        this.productSelected.id,
        this.LOADING_IDENTIFIER
      );
    },
  },
  created() {
    this.searchProducts();
    this.i18nConstants = { ...i18nConstants };
    this.formatDate = formatDate;
    this.PRODUCTS_EDIT = PRODUCTS_EDIT;
    this.PRODUCTS_DETAILS = PRODUCTS_DETAILS;
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, [
      "onSaleProducts",
      "search",
      "showFilter",
      "onSalePage",
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
