<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">Clientes</span>
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
              :items="clients"
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
              <template v-slot:item.birthday="{ item }">
                <span>{{ item.birthday && formatDate(item.birthday) }}</span>
              </template>
              <template v-slot:item.sex="{ item }">
                <v-icon :color="getSex(item.sex) ? 'accent' : 'primary'">
                  {{
                    getSex(item.sex) ? "mdi-gender-male" : "mdi-gender-female"
                  }}
                </v-icon>
              </template>
              <template v-slot:item.phone="{ item }">
                <span>{{ getPhone(item.phone) }}</span>
              </template>
              <template v-slot:item.cellPhone="{ item }">
                <span>{{ getCellPhone(item.cellPhone) }}</span>
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
        <material-clients-add :showAdd="showAdd" @fechar="showAdd = false" />
        <material-clients-filter
          @onFilter="onFilter"
          :loading="loading[LOADING_IDENTIFIER]"
          :filtered="filter"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import clientsActions from "@/actions/clientsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import { ToCurrency, formatDate } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import clientsConstants from "@/store/modules/clients/constants";
import { CLIENTS_EDIT, CLIENTS_DETAILS } from "@/router/routes";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      headers: [
        { text: "Nome", align: "start", value: "name" },
        { text: "Apelido", value: "nickname", align: "center" },
        { text: "Dt Nascimento", value: "birthday", align: "center" },
        { text: "Telefone", value: "phone", align: "center" },
        { text: "Celular", value: "cellPhone", align: "center" },
        { text: "Sexo", value: "sex", align: "center" },
        { text: "", value: "actions", sortable: false, align: "end" },
      ],
      filter: {},
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchClients",
      formatDate: formatDate,
    };
  },
  methods: {
    ...mapMutations(clientsConstants.MODULE_NAME, [
      clientsConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    onShowFilter() {
      this[clientsConstants.MUTATION_SET_SHOW_FILTER](true);
    },
    searchClients() {
      this.source = axiosSourceToken.obterToken();
      clientsActions.search(
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
        this.searchClients();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchClients();
    },
    onFilter(filter) {
      this.filter = filter;
      this.searchClients();
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    seeItem(item, isEdit = true) {
      if (isEdit)
        this.$router.push({ path: CLIENTS_EDIT.replace(":id", item.id) });
      else this.$router.push({ path: CLIENTS_DETAILS.replace(":id", item.id) });
    },
    getSex(sex) {
      return sex === "M" || sex === "m";
    },
    getPhone(phone) {
      return phone;
    },
    getCellPhone(cellPhone) {
      return cellPhone;
    },
  },
  created() {
    this.searchClients();
  },
  computed: {
    ...mapState(clientsConstants.MODULE_NAME, [
      "clients",
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
      this.searchClients();
    },
  },
};
</script>
