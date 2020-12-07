<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">Agendamentos</span>
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
              :to="SCHEDULES_ADD"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="agenda"
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
                  @click="seeItem(item)"
                  color="success"
                  :disabled="loading[LOADING_IDENTIFIER]"
                  >mdi-check</v-icon
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
        <material-agenda-filter
          @onFilter="onFilter"
          :loading="loading[LOADING_IDENTIFIER]"
          :filtered="filter"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import agendaActions from "@/actions/agendaActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import { ToCurrency, formatDate } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import agendaConstants from "@/store/modules/agenda/constants";
import { AGENDA_EDIT, AGENDA_DETAILS, SCHEDULES_ADD } from "@/router/routes";
import moment from "moment";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      headers: [
        { text: "", value: "status", sortable: false, align: "center" },
        { text: "Identificador", align: "start", value: "id" },
        { text: "Cliente", value: "client.name", align: "center" },
        { text: "Situação", value: "scheduleStatus.name", align: "center" },
        { text: "Data a realizar", value: "date", align: "center" },
        { text: "In loco", value: "inLoco", align: "center" },
        { text: "", value: "actions", sortable: false, align: "end" },
      ],
      filter: {},
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchAgenda",
      formatDate: formatDate,
      SCHEDULES_ADD: SCHEDULES_ADD,
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
        this.searchAgenda();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchAgenda();
    },
    onFilter(filter) {
      this.filter = filter;
      this.searchAgenda();
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    seeItem(item, isEdit = true) {
      if (isEdit)
        this.$router.push({ path: AGENDA_EDIT.replace(":id", item.id) });
      else this.$router.push({ path: AGENDA_DETAILS.replace(":id", item.id) });
    },
    getColor(item) {
      if (
        (item.idScheduleStatus == 1 || item.idScheduleStatus == 4) &&
        !moment(item.date).isAfter(moment(), "day")
      )
        return "error";
      if (item.idScheduleStatus == 1 || item.idScheduleStatus == 4)
        return "blue";
      else if (item.idScheduleStatus == 2) return "warning";
      else if (item.idScheduleStatus == 3) return "grey";
      else if (item.idScheduleStatus == 5) return "success";
      return "blue";
    },
    getText(item) {
      console.log();
      if (
        (item.idScheduleStatus == 1 || item.idScheduleStatus == 4) &&
        !moment(item.date).isAfter(moment(), "day")
      )
        return "Atrasado";
      if (item.idScheduleStatus == 1 || item.idScheduleStatus == 4)
        return "Nenhum problema";
      else if (item.idScheduleStatus == 2) return "Necessário itens no estoque";
      else if (item.idScheduleStatus == 3) return "Cancelado";
      else if (item.idScheduleStatus == 5) return "Realizado";
    },
  },
  created() {
    this.searchAgenda();
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
