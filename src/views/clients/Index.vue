<template>
  <div>
    <core-page-title :title="$tc(i18nConstants.CLIENT.NAME, 2)">
      <v-col cols="auto" class="ml-auto">
        <v-btn
          color="accent"
          icon
          large
          @click="onShowFilter()"
          :disabled="showFilter"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
        <v-btn color="accent" icon large @click="showAdd = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>

    <common-data-table
      :headers="headers"
      :items="clients"
      :loading="loading[LOADING_IDENTIFIER]"
      :sort="sort"
      @onSort="onSort"
    >
      <template v-slot:item.birthday="{ item }">
        <span>{{ formatDate(item.birthday) }}</span>
      </template>
      <template v-slot:item.sex="{ item }">
        <v-icon :color="getSex(item.sex) ? 'accent' : 'primary'">
          {{ getSex(item.sex) ? "mdi-gender-male" : "mdi-gender-female" }}
        </v-icon>
      </template>
      <template v-slot:item.phone="{ item }">
        <span>{{ getPhone(item.phone) }}</span>
      </template>
      <template v-slot:item.cellPhone="{ item }">
        <span>{{ getCellPhone(item.cellPhone) }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          :to="{
            name: CLIENTS_DETAILS.name,
            params: { id: item.id },
          }"
          :disabled="loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="edit(item)"
          color="accent"
          :disabled="loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
    </common-data-table>

    <core-pagination :page="page" @onPaging="onPaging" />
    <material-clients-add :showAdd="showAdd" @close="showAdd = false" />
    <material-clients-edit
      :showEdit="showEdit"
      @close="closeEdit"
      :id="clientSelected.id"
    />
    <material-clients-filter
      @onFilter="onFilter"
      :loading="loading[LOADING_IDENTIFIER]"
      :filtered="filter"
    />
  </div>
</template>

<script>
import clientsActions from "@/actions/clientsActions";
import { mapState, mapMutations } from "vuex";
import { ToCurrency, formatDate, format } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import clientsConstants from "@/store/modules/clients/constants";
import { CLIENTS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      showAdd: false,
      showEdit: false,
      clientSelected: {},
      headers: [
        {
          text: this.$t(i18nConstants.CLIENT.LIST.NAME),
          align: "start",
          value: "name",
        },
        {
          text: this.$t(i18nConstants.CLIENT.LIST.NICKNAME),
          value: "nickname",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.CLIENT.LIST.BIRTHDAY),
          value: "birthday",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.CLIENT.LIST.PHONE),
          value: "phone",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.CLIENT.LIST.CELL_PHONE),
          value: "cellPhone",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.CLIENT.LIST.SEX),
          value: "sex",
          align: "center",
        },
        { text: "", value: "actions", sortable: false, align: "end" },
      ],
      filter: {},
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchClients",
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
      clientsActions.search(
        this.filter,
        this.pagination,
        this.sort,
        uuidv4(),
        this.LOADING_IDENTIFIER
      );
    },
    onSort(sort) {
      this.sort = sort;
      this.searchClients();
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
    getSex(sex) {
      return sex === "M" || sex === "m";
    },
    getPhone(phone) {
      return format(phone, "(##) #####-####");
    },
    getCellPhone(cellPhone) {
      return format(cellPhone, "(##) #####-####");
    },
    edit(item) {
      this.showEdit = true;
      this.clientSelected = item;
    },
    closeEdit() {
      this.showEdit = false;
      this.clientSelected = {};
    },
  },
  created() {
    this.searchClients();
    this.i18nConstants = { ...i18nConstants };
    this.formatDate = formatDate;
    this.CLIENTS_DETAILS = CLIENTS_DETAILS;
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
  watch: {
    search() {
      this.searchClients();
    },
  },
};
</script>
