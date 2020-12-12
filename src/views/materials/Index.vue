<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">
              {{ $tc(i18nConstants.MATERIAL.NAME, 2) }}
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
              :items="materials"
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
        <material-materials-add :showAdd="showAdd" @fechar="showAdd = false" />
        <material-materials-filter
          @onFilter="onFilter"
          :loading="loading[LOADING_IDENTIFIER]"
          :filtered="filter"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import materialsActions from "@/actions/materialsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import { ToCurrency } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import { MATERIALS_EDIT, MATERIALS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      headers: [
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.NAME),
          align: "start",
          value: "name",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.PRICE),
          value: "price",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.AVALIABLE_QTY),
          value: "qty",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.RESERVED_QTY),
          value: "reservedQty",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.TOTAL_QTY),
          value: "qtyTotal",
          align: "center",
        },
        { text: "", value: "actions", sortable: false },
      ],
      filter: {},
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchMaterials",
    };
  },
  methods: {
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    onShowFilter() {
      this[materialsConstants.MUTATION_SET_SHOW_FILTER](true);
    },
    searchMaterials() {
      this.source = axiosSourceToken.obterToken();
      materialsActions.search(
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
        this.searchMaterials();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchMaterials();
    },
    onFilter(filter) {
      this.filter = filter;
      this.searchMaterials();
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    seeItem(item, isEdit = true) {
      if (isEdit)
        this.$router.push({ path: MATERIALS_EDIT.replace(":id", item.id) });
      else
        this.$router.push({ path: MATERIALS_DETAILS.replace(":id", item.id) });
    },
  },
  created() {
    this.searchMaterials();
    this.i18nConstants = { ...i18nConstants };
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, [
      "materials",
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
      this.searchMaterials();
    },
  },
};
</script>
