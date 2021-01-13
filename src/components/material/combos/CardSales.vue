<template>
  <div>
    <v-card
      :loading="loading[LOADING_IDENTIFIER]"
      :disabled="loading[LOADING_IDENTIFIER]"
    >
      <v-card-title>
        <span class="overline">
          {{ $t(i18nConstants.COMBO.CARD_SALES.NAME) }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-row align="end">
          <v-col cols="12" md="6" lg="3">
            <common-date-picker
              :date="filter.beginDate"
              :label="$t(i18nConstants.COMBO.CARD_SALES.LABELS.INITIAL_DATE)"
              @changeDate="(date) => changeDate(date, true)"
            />
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <common-date-picker
              :date="filter.endDate"
              :label="$t(i18nConstants.COMBO.CARD_SALES.LABELS.FINAL_DATE)"
              @changeDate="(date) => changeDate(date, false)"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-select
              v-model="filter.IdSaleStatus"
              multiple
              :items="saleStatuses"
              item-value="id"
              item-text="name"
              :label="$t(i18nConstants.COMBO.CARD_SALES.LABELS.SALE_STATUS)"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="
                    index === 0 &&
                    filter.IdSaleStatus.length !== saleStatuses.length
                  "
                  small
                >
                  <span>{{ item.name }}</span>
                </v-chip>
                <span
                  v-if="
                    index === 1 &&
                    filter.IdSaleStatus.length !== saleStatuses.length
                  "
                  class="grey--text caption"
                >
                  {{
                    $t(
                      i18nConstants.COMBO.CARD_SALES.LABELS
                        .SALE_STATUS_MULTIPLE_SELECTED,
                      { length: filter.IdSaleStatus.length - 1 }
                    )
                  }}
                </span>
                <span
                  v-if="
                    index === saleStatuses.length - 1 &&
                    filter.IdSaleStatus.length === saleStatuses.length
                  "
                  class="grey--text caption"
                >
                  {{
                    $t(
                      i18nConstants.COMBO.CARD_SALES.LABELS
                        .SALE_STATUS_ALL_SELECTED
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
              @click="searchSales()"
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
              :items="sales"
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
              <template v-slot:item.date="{ item }">
                <span>{{ formatDate(item.date) }}</span>
              </template>
              <template v-slot:item.createdAt="{ item }">
                <span>{{ formatDate(item.createdAt) }}</span>
              </template>
              <template v-slot:item.price="{ item }">
                <span>{{ toCurrency(item.price) }}</span>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <core-pagination :page="salesPage" @onPaging="onPaging" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import combosActions from "@/actions/combosActions";
import saleStatusActions from "@/actions/saleStatusActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";
import { formatDate, ToCurrency } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import saleStatusConstants from "@/store/modules/saleStatus/constants";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      source: "",
      headers: [
        {
          text: this.$t(i18nConstants.COMBO.CARD_SALES.LIST.SALE_STATUS_NAME),
          value: "saleStatus.name",
          align: "start",
          sortable: false,
        },
        {
          text: this.$t(i18nConstants.COMBO.CARD_SALES.LIST.DATE),
          value: "date",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t(i18nConstants.COMBO.CARD_SALES.LIST.CREATED_AT),
          value: "createdAt",
          align: "center",
          sortable: false,
        },
        {
          text: this.$t(i18nConstants.COMBO.CARD_SALES.LIST.PRICE),
          value: "price",
          align: "center",
          sortable: false,
        },
      ],
      filter: {
        beginDate: null,
        endDate: null,
        IdSaleStatus: [1, 2, 3, 4],
      },
      defFilter: {
        beginDate: null,
        endDate: null,
        IdSaleStatus: [1, 2, 3, 4],
      },
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchComboSales",
    };
  },
  methods: {
    searchSales() {
      this.source = axiosSourceToken.obterToken();
      let id = this.$route.params.id;

      combosActions.searchSales(
        id,
        this.source,
        this.filter,
        this.pagination,
        this.sort,
        this.LOADING_IDENTIFIER
      );
    },
    searchSaleStatus() {
      this.source = axiosSourceToken.obterToken();
      saleStatusActions.search(this.source);
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
        this.searchSales();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchSales();
    },
    clearFilter() {
      this.filter = this.defFilter;
      this.pagination = {};
      this.sort = {};
      this.searchSales();
    },
    changeDate(date, begin) {
      if (begin) this.filter.beginDate = date;
      else this.filter.endDate = date;
    },
    toCurrency(value) {
      return value ? ToCurrency(value, false, false) : "-";
    },
  },
  created() {
    this.searchSales();
    this.searchSaleStatus();
    this.i18nConstants = { ...i18nConstants };
    this.formatDate = formatDate;
  },
  computed: {
    ...mapState(combosConstants.MODULE_NAME, ["sales", "salesPage"]),
    ...mapState(saleStatusConstants.MODULE_NAME, ["saleStatuses"]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
