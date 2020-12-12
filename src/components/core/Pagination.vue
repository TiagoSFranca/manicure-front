<template>
  <v-row align="center">
    <v-col cols="3" class="text-left">
      <span class="caption white--text">
        {{ $t(i18nConstants.PAGINATION.SHOWING) }} {{ getStart() }}-{{
          getEnd()
        }}
        {{ $t(i18nConstants.PAGINATION.FROM) }} {{ page.total }}
        {{ $t(i18nConstants.PAGINATION.ITEMS) }}
      </span>
    </v-col>
    <v-col cols="6">
      <v-pagination
        v-model="page.number"
        :length="page.totalPages"
        :total-visible="7"
        @input="onChangePage"
      ></v-pagination>
    </v-col>
    <v-col cols="3">
      <v-autocomplete
        :items="page.limits"
        label="Itens por página"
        v-model="page.limit"
        @change="onChangeLimit"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
import { paginacaoList } from "@/utils/constants";
import cloneDeep from "lodash/cloneDeep";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["page"],
  data() {
    return {
      paginacaoList: paginacaoList.paginacao,
    };
  },
  methods: {
    getStart() {
      return (this.page.number - 1) * this.page.limit + 1;
    },
    getEnd() {
      let calc = this.page.number * this.page.limit;
      return this.page.total > calc ? calc : this.page.total;
    },
    onChangeLimit() {
      this.page.number = 1;
      this.paginate();
    },
    onChangePage() {
      this.paginate();
    },
    paginate() {
      let clonePage = { limit: this.page.limit, number: this.page.number };
      this.$emit("onPaging", clonePage);
    },
  },
  created() {
    this.i18nConstants = { ...i18nConstants };
  },
};
</script>