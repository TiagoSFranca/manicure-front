<template>
  <div>
    <v-card
      :loading="loading[LOADING_IDENTIFIER]"
      :disabled="loading[LOADING_IDENTIFIER]"
    >
      <v-card-title>
        <span class="overline">
          {{ $t(i18nConstants.MATERIAL.CARD_HISTORIC.NAME) }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="3">
            <common-date-picker
              :date="filter.initialDate"
              :label="
                $t(i18nConstants.MATERIAL.CARD_HISTORIC.LABELS.INITIAL_DATE)
              "
              @changeDate="(date) => changeDate(date, true)"
            />
          </v-col>
          <v-col cols="12" md="3">
            <common-date-picker
              :date="filter.finalDate"
              :label="
                $t(i18nConstants.MATERIAL.CARD_HISTORIC.LABELS.FINAL_DATE)
              "
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
              :label="
                $t(i18nConstants.MATERIAL.CARD_HISTORIC.LABELS.STOCK_TYPE)
              "
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0" small>
                  <span>{{ item.label }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text caption">
                  {{
                    $t(
                      i18nConstants.MATERIAL.CARD_HISTORIC.LABELS
                        .STOCK_TYPE_MULTIPLE_SELECTED,
                      { length: filter.IdMaterialStockStatus.length - 1 }
                    )
                  }}
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

        <common-data-table
          :headers="headers"
          :items="materialStocks"
          :loading="loading[LOADING_IDENTIFIER]"
          :sort="sort"
          @onSort="onSort"
        >
          <template v-slot:item.createdAt="{ item }">
            <span>{{ formatDate(item.createdAt) }}</span>
          </template>
          <template v-slot:item.qty="{ item }">
            <span>{{ toCurrency(item.qty) }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon
              :disabled="loading[LOADING_IDENTIFIER]"
              @click="seeItem(item)"
            >
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.idSchedule="{ item }">
            <v-simple-checkbox
              :value="item.idSchedule != null"
              disabled
              color="primary"
            ></v-simple-checkbox>
          </template>
        </common-data-table>

        <core-pagination :page="materialStockPage" @onPaging="onPaging" />
      </v-card-text>
    </v-card>
    <material-materials-stock-info
      :showInfo="showMaterialStock"
      @close="showMaterialStock = false"
      :materialStock="materialStockSelected"
    />
  </div>
</template>

<script>
import materialsActions from "@/actions/materialsActions";

import { mapState } from "vuex";
import { ToCurrency, formatDate } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import i18nConstants from "@/i18n/constants";
import { MATERIAL_SCHEDULE_STATUS } from "@/utils/constants";

export default {
  data() {
    return {
      headers: [
        {
          text: this.$t(i18nConstants.MATERIAL.CARD_HISTORIC.LIST.DATE),
          align: "start",
          value: "createdAt",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.CARD_HISTORIC.LIST.TYPE),
          value: "materialStockType.description",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t(i18nConstants.MATERIAL.CARD_HISTORIC.LIST.QTY),
          value: "qty",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.CARD_HISTORIC.LIST.IS_SCHEDULE),
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
      showMaterialStock: false,
      materialStockSelected: { materialStockType: {} },
    };
  },
  methods: {
    searchMaterialStocks() {
      let id = this.$route.params.id;

      materialsActions.searchMaterialStocks(
        id,
        this.filter,
        this.pagination,
        this.sort,
        this.LOADING_IDENTIFIER
      );
    },
    onSort(sort) {
      this.sort = sort;
      this.searchMaterialStocks();
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
    changeDate(date, begin) {
      if (begin) this.filter.initialDate = date;
      else this.filter.finalDate = date;
    },
    seeItem(item) {
      this.materialStockSelected = item;
      this.showMaterialStock = true;
    },
  },
  created() {
    this.searchMaterialStocks();
    this.i18nConstants = { ...i18nConstants };
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, [
      "materialStocks",
      "materialStockPage",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
};
</script>
