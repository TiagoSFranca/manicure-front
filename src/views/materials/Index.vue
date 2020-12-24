<template>
  <div>
    <core-page-title :title="$tc(i18nConstants.MATERIAL.NAME, 2)">
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
    </core-page-title>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="materials"
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
                />
              </template>
              <span>{{ getText(item) }}</span>
            </v-tooltip>
          </template>
          <template v-slot:item.price="{ item }">
            <span>{{ toCurrency(item.price) }}</span>
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
              :to="{
                name: MATERIALS_DETAILS.name,
                params: { id: item.id },
              }"
              :disabled="loading[LOADING_IDENTIFIER]"
            >
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              :to="{ name: MATERIALS_EDIT.name, params: { id: item.id } }"
              :disabled="loading[LOADING_IDENTIFIER]"
              color="accent"
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
        </v-data-table>
      </v-col>
    </v-row>
    <core-pagination :page="page" @onPaging="onPaging" />
    <material-materials-add :showAdd="showAdd" @close="showAdd = false" />
    <material-materials-filter
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
import materialsActions from "@/actions/materialsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import {
  ToCurrency,
  getMaterialStatusText,
  getMaterialStatusColor,
} from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import { MATERIALS_EDIT, MATERIALS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showAdd: false,
      showDialog: false,
      title: "",
      message: "",
      materialSelected: {},
      source: "",
      headers: [
        { text: "", value: "status", sortable: false, align: "center" },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.NAME),
          align: "start",
          value: "name",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.PRICE),
          value: "price",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.AVALIABLE_QTY),
          value: "qty",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.MIN_QTY),
          value: "minQty",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.RESERVED_QTY),
          value: "reservedQty",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.USED_QTY),
          value: "usedQty",
          align: "center",
        },
        {
          text: this.$t(i18nConstants.MATERIAL.LIST.ACTIVE),
          value: "active",
          align: "center",
        },
        { text: "", value: "actions", sortable: false, align: "end" },
      ],
      filter: {
        active: true,
      },
      pagination: {},
      sort: {},
      LOADING_IDENTIFIER: "searchMaterials",
      MATERIALS_EDIT: MATERIALS_EDIT,
      MATERIALS_DETAILS: MATERIALS_DETAILS,
    };
  },
  methods: {
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    onShowFilter() {
      this[materialsConstants.MUTATION_SET_SHOW_FILTER](true);
    },
    searchMaterials() {
      this.source = axiosSourceToken.obterToken();
      materialsActions.search(
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
        this.searchMaterials();
      }

      return items;
    },
    onPaging(pagination) {
      this.pagination = pagination;
      this.searchMaterials();
    },
    onFilter(filter) {
      this.filter = filter;
      this.searchMaterials();
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    getColor(item) {
      return getMaterialStatusColor(item.status);
    },
    getText(item) {
      return getMaterialStatusText(item.status);
    },
    deleteItem(item) {
      this.showDialog = true;

      var message = item.active
        ? this.i18nConstants.MATERIAL.LIST.MESSAGES.CONFIRM_DELETE
        : this.i18nConstants.MATERIAL.LIST.MESSAGES.CONFIRM_RESTORE;

      this.message = this.$t(message.MESSAGE);
      this.title = this.$t(message.TITLE);

      this.materialSelected = item;
    },
    confirmDialog() {
      this.showDialog = false;
      materialsActions.toggleActive(
        this.materialSelected.id,
        this.LOADING_IDENTIFIER
      );
    },
  },
  created() {
    this.searchMaterials();
    this.i18nConstants = { ...i18nConstants };
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, [
      "materials",
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
      this.searchMaterials();
    },
  },
};
</script>
