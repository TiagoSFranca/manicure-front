<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">Produtos</span>
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
              loading-text="Loading... Please wait"
              hide-default-footer
              :custom-sort="onSort"
              :disable-pagination="true"
              :disable-filtering="true"
              :disable-sort="!!loading[LOADING_IDENTIFIER]"
              :loading="loading[LOADING_IDENTIFIER] === true"
              :multi-sort="false"
            >
              <template v-slot:item.originalValue="{ item }">
                <span>{{ toCurrency(item.originalValue) }}</span>
              </template>
              <template v-slot:item.saleValue="{ item }">
                <span>{{ toCurrency(item.saleValue) }}</span>
              </template>
              <template v-slot:item.endSale="{ item }">
                <span>{{ new Date(item.endSale).toLocaleString() }}</span>
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
        <core-pagination
          :totalPaginas="10"
          :pagina="1"
          :totalItens="10"
          :itensPorPagina="5"
          :qtdItens="50"
          @paginar="onChangePaginar"
        />
        <material-products-add :showAdd="showAdd" @fechar="showAdd = false" />
        <material-products-edit
          :showEdit="showEdit"
          @fechar="
            {
              showEdit = false;
              item = {};
            }
          "
          :object="item"
          :isEdit="isEdit"
        />
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
import { ToCurrency } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";

export default {
  data() {
    return {
      email: "",
      showAdd: false,
      showEdit: false,
      isEdit: false,
      source: "",
      headers: [
        { text: "Nome", align: "start", value: "name" },
        { text: "Vl orignal", value: "originalValue", align: "center" },
        { text: "Vl Promocional", value: "saleValue", align: "center" },
        { text: "Em promoção", value: "onSale", align: "center" },
        { text: "Fim da promoção", value: "endSale", align: "center" },
        { text: "Ativo", value: "active", align: "center" },
        { text: "", value: "actions", sortable: false },
      ],
      filter: {},
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchProducts",
      item: {},
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
      productsActions.get(
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
    onChangePaginar(pagination) {
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
      this.showEdit = true;
      this.isEdit = isEdit;
      this.item = item;
    },
  },
  created() {
    this.searchProducts();
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, [
      "products",
      "search",
      "showFilter",
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
