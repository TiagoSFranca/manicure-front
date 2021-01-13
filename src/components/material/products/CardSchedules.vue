<template>
  <div>
    <v-card
      :loading="loading[LOADING_IDENTIFIER]"
      :disabled="loading[LOADING_IDENTIFIER]"
    >
      <v-card-title>
        <span class="overline">
          {{ $t(i18nConstants.PRODUCT.CARD_SCHEDULES.NAME) }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-row align="end">
          <v-col cols="12" md="6" lg="3">
            <common-date-picker
              :date="filter.beginDate"
              :label="
                $t(i18nConstants.PRODUCT.CARD_SCHEDULES.LABELS.INITIAL_DATE)
              "
              @changeDate="(date) => changeDate(date, true)"
            />
          </v-col>
          <v-col cols="12" md="6" lg="3">
            <common-date-picker
              :date="filter.endDate"
              :label="
                $t(i18nConstants.PRODUCT.CARD_SCHEDULES.LABELS.FINAL_DATE)
              "
              @changeDate="(date) => changeDate(date, false)"
            />
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-select
              v-model="filter.IdScheduleStatus"
              multiple
              :items="scheduleStatuses"
              item-value="id"
              item-text="name"
              :label="
                $t(i18nConstants.PRODUCT.CARD_SCHEDULES.LABELS.SCHEDULE_STATUS)
              "
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="
                    index === 0 &&
                    filter.IdScheduleStatus.length !== scheduleStatuses.length
                  "
                  small
                >
                  <span>{{ item.name }}</span>
                </v-chip>
                <span
                  v-if="
                    index === 1 &&
                    filter.IdScheduleStatus.length !== scheduleStatuses.length
                  "
                  class="grey--text caption"
                >
                  {{
                    $t(
                      i18nConstants.PRODUCT.CARD_SCHEDULES.LABELS
                        .SCHEDULE_STATUS_MULTIPLE_SELECTED,
                      { length: filter.IdScheduleStatus.length - 1 }
                    )
                  }}
                </span>
                <span
                  v-if="
                    index === scheduleStatuses.length - 1 &&
                    filter.IdScheduleStatus.length === scheduleStatuses.length
                  "
                  class="grey--text caption"
                >
                  {{
                    $t(
                      i18nConstants.PRODUCT.CARD_SCHEDULES.LABELS
                        .SCHEDULE_STATUS_ALL_SELECTED
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
              @click="searchSchedules()"
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
              :items="schedules"
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
              <template v-slot:item.status="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      :color="getColor(item)"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      fab
                      x-small
                    >
                    </v-btn>
                  </template>
                  <span>{{ getText(item) }}</span>
                </v-tooltip>
              </template>
              <template v-slot:item.id="{ item }">
                <span>{{ "#" + item.id }}</span>
              </template>
              <template v-slot:item.date="{ item }">
                <span>{{ formatDate(item.date) }}</span>
              </template>
              <template v-slot:item.finishDate="{ item }">
                <span>{{ formatDate(item.finishDate) }}</span>
              </template>
              <template v-slot:item.cancelDate="{ item }">
                <span>{{ formatDate(item.cancelDate) }}</span>
              </template>
              <template v-slot:item.inLoco="{ item }">
                <v-simple-checkbox
                  v-model="item.inLoco"
                  disabled
                  color="primary"
                />
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  icon
                  :to="{
                    name: SCHEDULES_DETAILS.name,
                    params: { id: item.id },
                  }"
                  :disabled="loading[LOADING_IDENTIFIER]"
                  target="_blank"
                  color="warning"
                >
                  <v-icon right>mdi-open-in-new</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <core-pagination :page="schedulesPage" @onPaging="onPaging" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import productsActions from "@/actions/productsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import scheduleStatusActions from "@/actions/scheduleStatusActions";
import { mapState } from "vuex";
import {
  formatDate,
  getScheduleStatusText,
  getScheduleStatusColor,
} from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";
import scheduleStatusConstants from "@/store/modules/scheduleStatus/constants";
import { SCHEDULES_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      source: "",
      headers: [
        { text: "", value: "status", sortable: false, align: "center" },
        {
          text: this.$t(i18nConstants.PRODUCT.CARD_SCHEDULES.LIST.ID),
          align: "start",
          value: "id",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.CARD_SCHEDULES.LIST.CLIENT_NAME),
          value: "client.name",
          align: "center",
        },
        {
          text: this.$t(
            i18nConstants.PRODUCT.CARD_SCHEDULES.LIST.SCHEDULE_STATUS_NAME
          ),
          value: "scheduleStatus.name",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.CARD_SCHEDULES.LIST.DATE),
          value: "date",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.CARD_SCHEDULES.LIST.FINISH_DATE),
          value: "finishDate",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.CARD_SCHEDULES.LIST.CANCEL_DATE),
          value: "cancelDate",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.PRODUCT.CARD_SCHEDULES.LIST.IN_LOCO),
          value: "inLoco",
          align: "center",
        },
        { text: "", value: "actions", sortable: false, align: "end" },
      ],
      filter: {
        beginDate: null,
        endDate: null,
        IdScheduleStatus: [2, 3],
      },
      defFilter: {
        beginDate: null,
        endDate: null,
        IdScheduleStatus: [2, 3],
      },
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchProductSchedules",
      formatDate: formatDate,
    };
  },
  methods: {
    searchSchedules() {
      this.source = axiosSourceToken.obterToken();
      let id = this.$route.params.id;

      productsActions.searchSchedules(
        id,
        this.source,
        this.filter,
        this.pagination,
        this.sort,
        this.LOADING_IDENTIFIER
      );
    },
    searchScheduleStatus() {
      this.source = axiosSourceToken.obterToken();
      scheduleStatusActions.search(this.source);
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
        this.searchSchedules();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchSchedules();
    },
    clearFilter() {
      this.filter = this.defFilter;
      this.pagination = {};
      this.sort = {};
      this.searchSchedules();
    },
    changeDate(date, begin) {
      if (begin) this.filter.beginDate = date;
      else this.filter.endDate = date;
    },
    getColor(item) {
      return getScheduleStatusColor(item.status);
    },
    getText(item) {
      return getScheduleStatusText(item.status);
    },
  },
  created() {
    this.searchSchedules();
    this.searchScheduleStatus();
    this.i18nConstants = { ...i18nConstants };
    this.SCHEDULES_DETAILS = SCHEDULES_DETAILS;
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, ["schedules", "schedulesPage"]),
    ...mapState(scheduleStatusConstants.MODULE_NAME, ["scheduleStatuses"]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
