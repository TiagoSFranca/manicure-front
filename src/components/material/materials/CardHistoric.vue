<template>
  <div>
    <v-card
      :loading="loading[LOADING_IDENTIFIER]"
      :disabled="loading[LOADING_IDENTIFIER]"
    >
      <v-card-title>
        <span class="overline">HISTÓRICO</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <common-date-picker
              :date="filter.initialDate"
              label="Data de cadastro"
              @changeDate="(date) => changeDate(date, true)"
            />
          </v-col>
          <v-col cols="12" md="3">
            <common-date-picker
              :date="filter.finalDate"
              label="Data de cadastro"
              @changeDate="(date) => changeDate(date, false)"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="filter.IdMaterialStockStatus"
              multiple
              :items="MATERIAL_SCHEDULE_STATUS.LIST"
              item-value="value"
              item-text="label"
              label="Tipo"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item.label }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">
                  (+{{ filter.IdMaterialStockStatus.length - 1 }} others)
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col cols="auto">
            <v-btn
              color="accent"
              @click="clearFilter()"
              icon
              fab
              :loading="loading[LOADING_IDENTIFIER]"
              ><v-icon>mdi-delete-empty-outline</v-icon></v-btn
            >
            <v-btn
              color="success"
              @click="searchMaterialStocks()"
              icon
              fab
              :loading="loading[LOADING_IDENTIFIER]"
              ><v-icon>mdi-magnify</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="materialStocks"
              class="elevation-1"
              :loading-text="$t(i18nConstants.LOADING_MESSAGE)"
              hide-default-footer
              :custom-sort="onSort"
              :disable-pagination="true"
              :disable-filtering="true"
              :disable-sort="!!loading[LOADING_IDENTIFIER]"
              :loading="loading[LOADING_IDENTIFIER]"
              :multi-sort="false"
            >
              <template v-slot:item.createdAt="{ item }">
                <span>{{ formatDate(item.createdAt) }}</span>
              </template>
              <template v-slot:item.qty="{ item }">
                <span>{{ toCurrency(item.qty) }}</span>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon :disabled="loading[LOADING_IDENTIFIER]">
                  <v-icon>mdi-eye-outline</v-icon>
                </v-btn>
              </template>
              <template v-slot:item.idSchedule="{ item }">
                <v-simple-checkbox
                  v-model="item.idSchedule"
                  disabled
                  color="primary"
                ></v-simple-checkbox>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <core-pagination :page="materialStockPage" @onPaging="onPaging" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import materialsActions from "@/actions/materialsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import {
  ToCurrency,
  getMaterialStatusText,
  getMaterialStatusColor,
  formatDate,
} from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import i18nConstants from "@/i18n/constants";
import { MATERIAL_SCHEDULE_STATUS } from "@/utils/constants";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      headers: [
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.NAME),
          align: "start",
          value: "createdAt",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.PRICE),
          value: "materialStockType.type",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.AVALIABLE_QTY),
          value: "qty",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.MIN_QTY),
          value: "idSchedule",
          align: "center",
          sortable: false,
        },
        { text: "", value: "actions", sortable: false, align: "end" },
      ],
      filter: {
        initialDate: null,
        finalDate: null,
        IdMaterialStockStatus: [1, 2],
      },
      defFilter: {
        initialDate: null,
        finalDate: null,
        IdMaterialStockStatus: [
          MATERIAL_SCHEDULE_STATUS.REGISTER,
          MATERIAL_SCHEDULE_STATUS.REMOVE,
        ],
      },
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchMaterialStocks",
      MATERIAL_SCHEDULE_STATUS: MATERIAL_SCHEDULE_STATUS,
      formatDate: formatDate,
    };
  },
  methods: {
    searchMaterialStocks() {
      this.source = axiosSourceToken.obterToken();
      let id = this.$route.params.id;

      materialsActions.searchMaterialStocks(
        id,
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
        this.searchMaterialStocks();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchMaterialStocks();
    },
    clearFilter() {
      this.filter = this.defFilter;
      this.pagination = {};
      this.sort = {};
      this.searchMaterialStocks();
    },
    toCurrency(value) {
      return ToCurrency(value);
    },
    getColor(item) {
      return getMaterialStatusColor(item.status);
    },
    getText(item) {
      return this.$t(getMaterialStatusText(item.status));
    },
    changeDate(date, begin) {
      if (begin) this.filter.initialDate = date;
      else this.filter.finalDate = date;
    },
  },
  created() {
    this.searchMaterialStocks();
    this.i18nConstants = { ...i18nConstants };
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, [
      "materialStocks",
      "showFilter",
      "materialStockPage",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
