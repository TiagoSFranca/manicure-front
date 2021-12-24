<template>
  <div>
    <core-page-title :title="$tc(i18nConstants.SCHEDULE.NAME, 2)">
      <v-col cols="auto">
        <v-btn
          color="accent"
          icon
          large
          @click="onShowFilter()"
          :disabled="showFilter"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn color="accent" icon large :to="SCHEDULES_ADD">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>
    <common-data-table
      :headers="headers"
      :items="agenda"
      :loading="loading[LOADING_IDENTIFIER]"
      :sort="sort"
      @onSort="onSort"
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
        <v-simple-checkbox v-model="item.inLoco" disabled color="primary" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          :to="{
            name: SCHEDULES_DETAILS.name,
            params: { id: item.id },
          }"
          :disabled="loading[LOADING_IDENTIFIER]"
        >
          <v-icon> mdi-eye-outline </v-icon>
        </v-btn>
        <v-btn
          icon
          color="success"
          :to="{ name: SCHEDULES_FINISH.name, params: { id: item.id } }"
          :disabled="loading[LOADING_IDENTIFIER] || setCancelDisabled(item)"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
          icon
          color="error"
          @click="cancelItem(item)"
          :disabled="loading[LOADING_IDENTIFIER] || setCancelDisabled(item)"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </template>
    </common-data-table>
    <core-pagination :page="page" @onPaging="onPaging" />
    <material-schedules-filter
      @onFilter="onFilter"
      :loading="loading[LOADING_IDENTIFIER]"
      :filtered="filter"
    />
    <material-schedules-cancel
      :showCancel="showCancel"
      @close="showCancel = false"
      :schedule="scheduleToCancel"
    />
  </div>
</template>

<script>
import agendaActions from "@/actions/agendaActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import {
  formatDate,
  getScheduleStatusText,
  getScheduleStatusColor,
  checkDisabledCancelScheduleFromStatus,
} from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import agendaConstants from "@/store/modules/agenda/constants";
import {
  SCHEDULES_ADD,
  SCHEDULES_FINISH,
  SCHEDULES_DETAILS,
} from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showAdd: false,
      showCancel: false,
      scheduleToCancel: {},
      source: "",
      headers: [
        { text: "", value: "status", sortable: false, align: "center" },
        {
          text: this.$t(i18nConstants.SCHEDULE.LIST.ID),
          align: "start",
          value: "id",
        },
        {
          text: this.$t(i18nConstants.SCHEDULE.LIST.CLIENT_NAME),
          value: "client.name",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.SCHEDULE.LIST.SCHEDULE_STATUS_NAME),
          value: "scheduleStatus.name",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.SCHEDULE.LIST.DATE),
          value: "date",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.SCHEDULE.LIST.FINISH_DATE),
          value: "finishDate",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.SCHEDULE.LIST.CANCEL_DATE),
          value: "cancelDate",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.SCHEDULE.LIST.IN_LOCO),
          value: "inLoco",
          align: "center",
        },
        { text: "", value: "actions", sortable: false, align: "end" },
      ],
      filter: {},
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchSchedules",
      formatDate: formatDate,
      SCHEDULES_ADD: SCHEDULES_ADD,
      SCHEDULES_FINISH: SCHEDULES_FINISH,
      SCHEDULES_DETAILS: SCHEDULES_DETAILS,
    };
  },
  methods: {
    ...mapMutations(agendaConstants.MODULE_NAME, [
      agendaConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    onShowFilter() {
      this[agendaConstants.MUTATION_SET_SHOW_FILTER](true);
    },
    searchAgenda() {
      this.source = axiosSourceToken.obterToken();
      agendaActions.search(
        this.source,
        this.filter,
        this.pagination,
        this.sort,
        this.LOADING_IDENTIFIER
      );
    },
    onSort(sort) {
      this.sort = sort;
      this.searchAgenda();
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchAgenda();
    },
    onFilter(filter) {
      this.filter = filter;
      this.searchAgenda();
    },
    getColor(item) {
      return getScheduleStatusColor(item.status);
    },
    getText(item) {
      return getScheduleStatusText(item.status);
    },
    cancelItem(item) {
      this.showCancel = true;
      this.scheduleToCancel = item;
    },
    setCancelDisabled(item) {
      return checkDisabledCancelScheduleFromStatus(item.status);
    },
  },
  created() {
    this.searchAgenda();
    this.i18nConstants = { ...i18nConstants };
  },
  computed: {
    ...mapState(agendaConstants.MODULE_NAME, [
      "agenda",
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
      this.searchAgenda();
    },
  },
};
</script>
