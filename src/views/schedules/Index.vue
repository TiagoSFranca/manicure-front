<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">Combos</span>
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
              :items="combos"
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
        <material-combos-add :showAdd="showAdd" @fechar="showAdd = false" />
        <material-combos-filter
          @onFilter="onFilter"
          :loading="loading[LOADING_IDENTIFIER]"
          :filtered="filter"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import combosActions from "@/actions/combosActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import { ToCurrency, formatDate } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import { COMBOS_EDIT, COMBOS_DETAILS } from "@/router/routes";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      headers: [
        { text: "Nome", align: "start", value: "name" },
        { text: "Vl orignal", value: "price", align: "center" },
        { text: "Vl Promocional", value: "promotionalPrice", align: "center" },
        { text: "Em promoção", value: "onSale", align: "center" },
        { text: "Fim da promoção", value: "endSale", align: "center" },
        { text: "Ativo", value: "active", align: "center" },
        { text: "", value: "actions", sortable: false },
      ],
      filter: {},
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchCombos",
      formatDate: formatDate
    };
  },
  methods: {
    ...mapMutations(combosConstants.MODULE_NAME, [
      combosConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    onShowFilter() {
      this[combosConstants.MUTATION_SET_SHOW_FILTER](true);
    },
    searchCombos() {
      this.source = axiosSourceToken.obterToken();
      combosActions.search(
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
        this.searchCombos();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchCombos();
    },
    onFilter(filter) {
      this.filter = filter;
      this.searchCombos();
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    seeItem(item, isEdit = true) {
      if (isEdit)
        this.$router.push({ path: COMBOS_EDIT.replace(":id", item.id) });
      else
        this.$router.push({ path: COMBOS_DETAILS.replace(":id", item.id) });
    },
  },
  created() {
    this.searchCombos();
  },
  computed: {
    ...mapState(combosConstants.MODULE_NAME, [
      "combos",
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
      this.searchCombos();
    },
  },
};
</script>
