<template>
  <div>
    <core-page-title :title="$tc(i18nConstants.COMBO.NAME, 2)">
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
        <v-btn color="accent" icon large @click="showAdd = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>

    <common-data-table
      :headers="headers"
      :items="combos"
      :loading="loading[LOADING_IDENTIFIER]"
      :sort="sort"
      @onSort="onSort"
    >
      <template v-slot:item.price="{ item }">
        <span>{{ toCurrency(item.price) }}</span>
      </template>
      <template v-slot:item.promotionalPrice="{ item }">
        <span>{{ toCurrency(item.promotionalPrice) }}</span>
      </template>
      <template v-slot:item.endSale="{ item }">
        <span>{{ item.endSale && formatDate(item.endSale) }}</span>
      </template>
      <template v-slot:item.onSale="{ item }">
        <v-simple-checkbox
          v-model="item.onSale"
          disabled
          color="primary"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.active="{ item }">
        <v-simple-checkbox
          v-model="item.active"
          disabled
          color="primary"
        ></v-simple-checkbox>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon
          :disabled="loading[LOADING_IDENTIFIER]"
          :to="{ name: COMBOS_DETAILS.name, params: { id: item.id } }"
          small
        >
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          color="accent"
          :disabled="loading[LOADING_IDENTIFIER]"
          :to="{ name: COMBOS_EDIT.name, params: { id: item.id } }"
          small
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          :disabled="loading[LOADING_IDENTIFIER]"
          :color="item.active ? 'error' : 'success'"
          @click="deleteItem(item)"
        >
          <v-icon>
            {{ item.active ? "mdi-delete-outline" : "mdi-delete-restore" }}
          </v-icon>
        </v-btn>
      </template>
    </common-data-table>

    <core-pagination :page="page" @onPaging="onPaging" />
    <material-combos-add :showAdd="showAdd" @close="showAdd = false" />
    <material-combos-filter
      @onFilter="onFilter"
      :loading="loading[LOADING_IDENTIFIER]"
      :filtered="filter"
    />
    <common-confirm-dialog
      :showDialog="showDialog"
      :title="title"
      :message="message"
      @close="showDialog = false"
    >
      <template slot="actions">
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="showDialog = false"
          icon
          fab
          :loading="loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          color="success"
          submit
          icon
          fab
          @click="confirmDialog()"
          :loading="loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </common-confirm-dialog>
  </div>
</template>

<script>
import combosActions from "@/actions/combosActions";
import { mapState, mapMutations } from "vuex";
import { ToCurrency, formatDate } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import { COMBOS_EDIT, COMBOS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      showAdd: false,
      showDialog: false,
      title: "",
      message: "",
      productSelected: {},
      headers: [
        {
          text: this.$t(i18nConstants.COMBO.LIST.NAME),
          align: "start",
          value: "name",
        },
        {
          text: this.$t(i18nConstants.COMBO.LIST.PRICE),
          value: "price",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.COMBO.LIST.PROMOTIONAL_PRICE),
          value: "promotionalPrice",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.COMBO.LIST.ON_SALE),
          value: "onSale",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.COMBO.LIST.END_SALE),
          value: "endSale",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.COMBO.LIST.ACTIVE),
          value: "active",
          align: "center",
        },
        { text: "", value: "actions", align: "end", sortable: false },
      ],
      filter: { active: true },
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchCombos",
    };
  },
  methods: {
    ...mapMutations(combosConstants.MODULE_NAME, [
      combosConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    onShowFilter() {
      this[combosConstants.MUTATION_SET_SHOW_FILTER](true);
    },
    searchCombos() {
      combosActions.search(
        this.filter,
        this.pagination,
        this.sort,
        uuidv4(),
        this.LOADING_IDENTIFIER
      );
    },
    onSort(sort) {
      this.sort = sort;
      this.searchCombos();
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchCombos();
    },
    onFilter(filter) {
      this.filter = filter;
      this.searchCombos();
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    deleteItem(item) {
      this.showDialog = true;

      var message = item.active
        ? this.i18nConstants.COMBO.LIST.MESSAGES.CONFIRM_DELETE
        : this.i18nConstants.COMBO.LIST.MESSAGES.CONFIRM_RESTORE;

      this.message = this.$t(message.MESSAGE);
      this.title = this.$t(message.TITLE);

      this.comboSelected = item;
    },
    confirmDialog() {
      this.showDialog = false;
      combosActions.toggleActive(
        this.comboSelected.id,
        this.LOADING_IDENTIFIER
      );
    },
  },
  created() {
    this.searchCombos();
    this.i18nConstants = { ...i18nConstants };
    this.formatDate = formatDate;
    this.COMBOS_EDIT = COMBOS_EDIT;
    this.COMBOS_DETAILS = COMBOS_DETAILS;
  },
  computed: {
    ...mapState(combosConstants.MODULE_NAME, [
      "combos",
      "search",
      "showFilter",
      "page",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    search() {
      this.searchCombos();
    },
  },
};
</script>
