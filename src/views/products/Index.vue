<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <v-toolbar-title>Produtos</v-toolbar-title>
          </v-col>
          <v-col cols="auto" class="ml-auto">
            <v-btn color="accent" elevation="2" fab outlined rounded small>
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="accent" elevation="2" fab outlined rounded small @click="showAdd = true">
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
              :disable-sort="!!loading"
              :loading="loading"
              :multi-sort="false"
            >
              <template v-slot:item.originalValue="{ item }">
                <span>{{toCurrency(item.originalValue)}}</span>
              </template>
              <template v-slot:item.saleValue="{ item }">
                <span>{{toCurrency(item.saleValue)}}</span>
              </template>
              <template v-slot:item.endSale="{ item }">
                <span>{{new Date(item.endSale).toLocaleString()}}</span>
              </template>
              <template v-slot:item.onSale="{ item }">
                <v-simple-checkbox v-model="item.onSale" disabled color="primary"></v-simple-checkbox>
              </template>
              <template v-slot:item.active="{ item }">
                <v-simple-checkbox v-model="item.active" disabled color="primary"></v-simple-checkbox>
              </template>
              <template v-slot:item.comments="{ item }">
                <v-icon
                  @click="showComment(item)"
                  color="accent"
                  :disabled="loading"
                >mdi-comment-eye</v-icon>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon @click="editItem(item)" color="primary" :disabled="loading">mdi-pencil</v-icon>
                <v-icon @click="deleteItem(item)" color="error" :disabled="loading">mdi-delete</v-icon>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import productsActions from "@/actions/productsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";
import { ToCurrency } from "@/utils/methods";

export default {
  data() {
    return {
      loading: false,
      showAdd: false,
      source: "",
      headers: [
        { text: "Nome", align: "start", value: "name" },
        { text: "Vl orignal", value: "originalValue", align: "center" },
        { text: "Vl Promocional", value: "saleValue", align: "center" },
        { text: "Em promoção", value: "onSale", align: "center" },
        { text: "Fim da promoção", value: "endSale", align: "center" },
        { text: "Ativo", value: "active", align: "center" },
        { text: "Comentários", value: "comments", align: "center" },
        { text: "", value: "actions", sortable: false }
      ],
      filter: {},
      pagination: {},
      sort: {}
    };
  },
  methods: {
    searchProducts() {
      this.loading = true;
      this.source = axiosSourceToken.obterToken();
      productsActions
        .get(this.source, this.filter, this.pagination, this.sort)
        .then(res => {
          if (res) {
            this.successSearch = true;
          } else {
            this.successSearch = false;
          }
          this.loading = false;
        });
    },
    onSort(items, index, isDesc) {
      let prevSort = this.sort;

      if (index && index.length > 0) {
        this.sort = {
          orderBy: index[0],
          asc: !isDesc
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
    onFiltrar(filter) {
      this.filter = filter;
      this.searchProducts();
    },
    toCurrency(value) {
      return ToCurrency(value);
    }
  },
  created() {
    this.searchProducts();
  },
  computed: {
    ...mapState("products", ["products", "search"])
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  watch: {
    search() {
      this.searchProducts();
    }
  }
};
</script>
