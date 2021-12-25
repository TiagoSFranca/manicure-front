<template>
  <div>
    <core-page-title :title="$tc(i18nConstants.PRODUCT.NAME, 2)">
      <v-col cols="auto" class="ml-auto">
        <v-btn
          color="accent"
          icon
          large
          @click="onShowFilter()"
          :disabled="showFilter"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn color="accent" icon large @click="showAdd = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>

    <common-data-table
      :headers="headers"
      :items="products"
      :loading="loading[LOADING_IDENTIFIER]"
      :sort="sort"
      @onSort="onSort"
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
        <v-btn
          icon
          :disabled="loading[LOADING_IDENTIFIER]"
          :to="{ name: PRODUCTS_DETAILS.name, params: { id: item.id } }"
          small
        >
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          color="accent"
          :disabled="loading[LOADING_IDENTIFIER]"
          :to="{ name: PRODUCTS_EDIT.name, params: { id: item.id } }"
          small
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          :disabled="loading[LOADING_IDENTIFIER]"
          :color="item.active ? 'error' : 'success'"
          @click="deleteItem(item)"
        >
          <v-icon>
            {{ item.active ? "mdi-delete-outline" : "mdi-delete-restore" }}
          </v-icon>
        </v-btn>
      </template>
    </common-data-table>

    <core-pagination :page="page" @onPaging="onPaging" />
    <material-products-add :showAdd="showAdd" @close="showAdd = false" />
    <material-products-filter
      @onFilter="onFilter"
      :loading="loading[LOADING_IDENTIFIER]"
      :filtered="filter"
    />
    <common-confirm-dialog
      :showDialog="showDialog"
      :title="title"
      :message="message"
      @close="showDialog = false"
    >
      <template slot="actions">
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="showDialog = false"
          icon
          fab
          :loading="loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          color="success"
          submit
          icon
          fab
          @click="confirmDialog()"
          :loading="loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </common-confirm-dialog>
  </div>
</template>

<script>
import productsActions from "@/actions/productsActions";

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
      filter: { active: true },
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchProducts",
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
      productsActions.search(
        this.filter,
        this.pagination,
        this.sort,
        this.LOADING_IDENTIFIER
      );
    },
    onSort(sort) {
      this.sort = sort;
      this.searchProducts();
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
      "products",
      "search",
      "showFilter",
      "page",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    search() {
      this.searchProducts();
    },
  },
};
</script>
