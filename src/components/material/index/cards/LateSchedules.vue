<template>
  <div>
    <v-row class="fill-height">
      <v-col>
        <v-card
          :loading="loading[LOADING_IDENTIFIER]"
          :disabled="loading[LOADING_IDENTIFIER]"
        >
          <v-card-title>
            <span class="overline">
              {{ $tc(i18nConstants.SCHEDULE.LATE_NAME, 2) }}
            </span>
            <v-spacer />
            <v-btn
              color="accent"
              icon
              large
              @click="onShowFilter()"
              :disabled="showFilter"
            >
              <v-icon>mdi-filter</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <common-data-table
              :headers="headers"
              :items="lateSchedules"
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
                >
                  <v-icon> mdi-eye-outline </v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="success"
                  :to="{
                    name: SCHEDULES_FINISH.name,
                    params: { id: item.id },
                  }"
                  :disabled="
                    loading[LOADING_IDENTIFIER] || setCancelDisabled(item)
                  "
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="error"
                  @click="cancelItem(item)"
                  :disabled="
                    loading[LOADING_IDENTIFIER] || setCancelDisabled(item)
                  "
                >
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </template>
            </common-data-table>

            <core-pagination :page="lateSchedulesPage" @onPaging="onPaging" />
            <material-index-filters-late-schedules
              @onFilter="onFilter"
              :loading="loading[LOADING_IDENTIFIER]"
              :filtered="filter"
            />
            <material-schedules-cancel
              :showCancel="showCancel"
              @close="showCancel = false"
              :schedule="scheduleToCancel"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import agendaActions from "@/actions/agendaActions";
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
      showCancel: false,
      scheduleToCancel: {},
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
          text: this.$t(i18nConstants.SCHEDULE.LIST.DATE),
          value: "date",
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
      LOADING_IDENTIFIER: "searchLateSchedules",
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
      agendaActions.searchLateSchedules(
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
      "lateSchedules",
      "search",
      "showFilter",
      "lateSchedulesPage",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    search() {
      this.searchAgenda();
    },
  },
};
</script>
