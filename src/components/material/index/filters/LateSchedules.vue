<template>
  <common-filter
    :title="$t(SCHEDULE.FILTER.LATE_NAME)"
    :showFilter="showFilter"
    :loading="loading"
    @onCloseFilter="closeFilter"
    @onClearFilter="clearFilter"
    @onFilter="onFilter"
  >
    <v-row align="end" justify="center" class="ml-1 mr-1">
      <v-col cols="12" md="2" sm="3" lg="1">
        <v-text-field
          v-model="filter.id"
          :label="$t(SCHEDULE.FILTER.LABELS.ID)"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3" sm="3" lg="3">
        <v-text-field
          v-model="filter.clientName"
          :label="$t(SCHEDULE.FILTER.LABELS.NAME)"
        ></v-text-field>
      </v-col>

      <v-col cols="auto">
        <v-radio-group
          v-model="filter.inLoco"
          :label="$t(SCHEDULE.FILTER.LABELS.IN_LOCO)"
          row
        >
          <v-radio
            :label="$t(SCHEDULE.FILTER.LABELS.IN_LOCO_OPTIONS.ALL)"
            :value="NOT_SELECTED"
          ></v-radio>
          <v-radio
            :label="$t(SCHEDULE.FILTER.LABELS.IN_LOCO_OPTIONS.YES)"
            :value="true"
          ></v-radio>
          <v-radio
            :label="$t(SCHEDULE.FILTER.LABELS.IN_LOCO_OPTIONS.NOT)"
            :value="false"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </common-filter>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import agendaConstants from "@/store/modules/agenda/constants";
import i18nConstants from "@/i18n/constants";

const NOT_SELECTED = "NONE";

export default {
  props: ["loading", "filtered"],
  data() {
    return {
      page: 1,
      filter: {
        id: null,
        clientName: null,
        beginDate: null,
        endDate: null,
        inLoco: NOT_SELECTED,
      },
      defFilter: {
        id: null,
        clientName: null,
        beginDate: null,
        endDate: null,
        inLoco: NOT_SELECTED,
      },
    };
  },
  computed: {
    ...mapState(agendaConstants.MODULE_NAME, ["showFilter"]),
  },
  watch: {
    showFilter(val) {
      if (val === true) {
        if (this.filtered.inLoco == undefined || this.filtered.inLoco == "") {
          this.filtered.inLoco = NOT_SELECTED;
        }

        this.filter = { ...this.filtered };
      } else {
        this.clearFilter();
      }
    },
  },
  methods: {
    ...mapMutations(agendaConstants.MODULE_NAME, [
      agendaConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    closeFilter() {
      this[agendaConstants.MUTATION_SET_SHOW_FILTER](false);
    },
    clearFilter() {
      this.filter = { ...this.defFilter };
    },
    onFilter() {
      this.$emit("onFilter", {
        ...this.filter,
        inLoco: this.filter.inLoco === NOT_SELECTED ? "" : this.filter.inLoco,
      });
    },
    changeDate(date, begin) {
      if (begin) this.filter.beginDate = date;
      else this.filter.endDate = date;
    },
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
    this.NOT_SELECTED = NOT_SELECTED;
  },
};
</script>