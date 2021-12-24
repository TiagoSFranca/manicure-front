<template>
  <common-filter
    :title="$t(MATERIAL.FILTER.WARNING_STOCK_NAME)"
    :showFilter="showFilter"
    :loading="loading"
    @onCloseFilter="closeFilter"
    @onClearFilter="clearFilter"
    @onFilter="onFilter"
  >
    <v-row align="center" justify="center">
      <v-col cols="12" md="3">
        <v-text-field
          v-model="filter.name"
          :label="$t(MATERIAL.FILTER.LABELS.NAME)"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-radio-group
          v-model="filter.active"
          :label="$t(MATERIAL.FILTER.LABELS.ACTIVE)"
        >
          <v-radio
            :label="$t(MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.ALL)"
            :value="NOT_SELECTED"
          ></v-radio>
          <v-radio
            :label="$t(MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.YES)"
            :value="true"
          ></v-radio>
          <v-radio
            :label="$t(MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.NOT)"
            :value="false"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </common-filter>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import materialsConstants from "@/store/modules/materials/constants";
import i18nConstants from "@/i18n/constants";

const NOT_SELECTED = "NONE";

export default {
  props: ["loading", "filtered"],
  data() {
    return {
      page: 1,
      filter: {
        name: "",
        active: true,
      },
      source: "",
      NOT_SELECTED: NOT_SELECTED,
    };
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, ["showFilter"]),
  },
  watch: {
    showFilter(val) {
      if (val === true) {
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
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    closeFilter() {
      this[materialsConstants.MUTATION_SET_SHOW_FILTER](false);
    },
    clearFilter() {
      this.$refs.form.reset();
      this.filter = { active: true };
    },
    onFilter() {
      this.$emit("onFilter", {
        ...this.filter,
        active: this.filter.active === NOT_SELECTED ? "" : this.filter.active,
      });
    },
  },
  created() {
    this.MATERIAL = i18nConstants.MATERIAL;
  },
};
</script>