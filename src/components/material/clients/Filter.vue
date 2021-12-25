<template>
  <common-filter
    title="$t(PRODUCT.FILTER.ON_SALE_NAME)"
    :showFilter="showFilter"
    :loading="loading"
    @onCloseFilter="closeFilter"
    @onClearFilter="clearFilter"
    @onFilter="onFilter"
  >
    <v-row align="start" justify="center">
      <v-col cols="12" md="3">
        <v-text-field v-model="filter.name" label="Nome"></v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <common-date-picker
          :date="filter.beginEndSale"
          label="Fim da Promoção - Início"
          @changeDate="(date) => changeDate(date, true)"
        />
      </v-col>

      <v-col cols="12" md="3">
        <common-date-picker
          :date="filter.endEndSale"
          label="Fim da Promoção - Fim"
          @changeDate="(date) => changeDate(date, false)"
        />
      </v-col>

      <v-col cols="auto">
        <v-radio-group v-model="filter.active" label="Ativo">
          <v-radio label="Todos" :value="NOT_SELECTED"></v-radio>
          <v-radio label="Sim" value="true"></v-radio>
          <v-radio label="Não" value="false"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="auto">
        <v-radio-group v-model="filter.onSale" label="Em Promoção">
          <v-radio label="Todos" :value="NOT_SELECTED"></v-radio>
          <v-radio label="Sim" value="true"></v-radio>
          <v-radio label="Não" value="false"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </common-filter>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import clientsConstants from "@/store/modules/clients/constants";

const NOT_SELECTED = "NONE";

export default {
  props: ["loading", "filtered"],
  data() {
    return {
      page: 1,
      filter: {
        name: "",
        active: NOT_SELECTED,
        onSale: NOT_SELECTED,
        beginEndSale: "",
        endEndSale: "",
      },
      NOT_SELECTED: NOT_SELECTED,
    };
  },
  computed: {
    ...mapState(clientsConstants.MODULE_NAME, ["showFilter"]),
  },
  watch: {
    showFilter(val) {
      if (val === true) {
        if (this.filtered.onSale == undefined) {
          this.filtered.onSale = NOT_SELECTED;
        }

        if (this.filtered.active == undefined) {
          this.filtered.active = NOT_SELECTED;
        }

        this.filter = { ...this.filtered };
      } else {
        this.clearFilter();
      }
    },
  },
  methods: {
    ...mapMutations(clientsConstants.MODULE_NAME, [
      clientsConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    closeFilter() {
      this[clientsConstants.MUTATION_SET_SHOW_FILTER](false);
    },
    clearFilter() {
      this.$refs.form.reset();
      this.filter = {
        active: NOT_SELECTED,
        onSale: NOT_SELECTED,
      };
    },
    onFilter() {
      this.$emit("onFilter", {
        ...this.filter,
        active: this.filter.active === NOT_SELECTED ? "" : this.filter.active,
        onSale: this.filter.onSale === NOT_SELECTED ? "" : this.filter.onSale,
      });
    },
    changeDate(date, begin) {
      if (begin) this.filter.beginEndSale = date;
      else this.filter.endEndSale = date;
    },
  },
};
</script>