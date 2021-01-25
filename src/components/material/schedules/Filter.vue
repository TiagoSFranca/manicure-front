<template>
  <v-overlay :value="showFilter" z-index="200">
    <v-bottom-sheet :value="showFilter" hide-overlay persistent>
      <v-sheet class="text-center">
        <v-row>
          <v-col>
            <div class="title">{{ $t(SCHEDULE.FILTER.NAME) }}</div>
          </v-col>
        </v-row>
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
          <v-col cols="12" md="3" lg="2">
            <common-date-picker
              :date="filter.beginDate"
              :label="$t(SCHEDULE.FILTER.LABELS.BEGIN_DATE)"
              @changeDate="(date) => changeDate(date, true)"
            />
          </v-col>
          <v-col cols="12" md="3" lg="2">
            <common-date-picker
              :date="filter.endDate"
              :label="$t(SCHEDULE.FILTER.LABELS.END_DATE)"
              @changeDate="(date) => changeDate(date, false)"
            />
          </v-col>

          <v-col cols="12" md="3" lg="3">
            <v-select
              v-model="filter.idScheduleStatus"
              multiple
              :items="scheduleStatuses"
              item-value="id"
              item-text="name"
              :label="$t(SCHEDULE.FILTER.LABELS.SCHEDULE_STATUS)"
            >
              <template v-slot:selection="{ item, index }">
                <v-chip
                  v-if="
                    index === 0 &&
                    filter.idScheduleStatus.length !== scheduleStatuses.length
                  "
                  small
                >
                  <span>{{ item.name }}</span>
                </v-chip>
                <span
                  v-if="
                    index === 1 &&
                    filter.idScheduleStatus.length !== scheduleStatuses.length
                  "
                  class="grey--text caption"
                >
                  {{
                    $t(
                      SCHEDULE.FILTER.LABELS.SCHEDULE_STATUS_MULTIPLE_SELECTED,
                      { length: filter.idScheduleStatus.length - 1 }
                    )
                  }}
                </span>
                <span
                  v-if="
                    index === scheduleStatuses.length - 1 &&
                    filter.idScheduleStatus.length === scheduleStatuses.length
                  "
                  class="grey--text caption"
                >
                  {{ $t(SCHEDULE.FILTER.LABELS.SCHEDULE_STATUS_ALL_SELECTED) }}
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col cols="auto">
            <v-radio-group
              v-model="filter.inLoco"
              :label="$t(SCHEDULE.FILTER.LABELS.IN_LOCO)"
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
        <v-row>
          <v-col>
            <v-btn
              class="mx-6"
              color="error"
              @click="closeFilter()"
              icon
              fab
              small
            >
              <v-icon>mdi-close</v-icon></v-btn
            >
            <v-btn
              class="mx-6"
              color="accent"
              @click="clearFilter()"
              icon
              fab
              small
              :loading="loading"
              ><v-icon>mdi-delete-empty-outline</v-icon></v-btn
            >
            <v-btn
              class="mx-6"
              color="success"
              @click="onFilter()"
              icon
              fab
              large
              :loading="loading"
              ><v-icon>mdi-magnify</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </v-overlay>
</template>

<script>
import scheduleStatusActions from "@/actions/scheduleStatusActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import agendaConstants from "@/store/modules/agenda/constants";
import scheduleStatusConstants from "@/store/modules/scheduleStatus/constants";
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
        idScheduleStatus: [1, 2, 3],
        inLoco: NOT_SELECTED,
      },
      defFilter: {
        id: null,
        clientName: null,
        beginDate: null,
        endDate: null,
        idScheduleStatus: [1, 2, 3],
        inLoco: NOT_SELECTED,
      },
      source: "",
    };
  },
  computed: {
    ...mapState(agendaConstants.MODULE_NAME, ["showFilter"]),
    ...mapState(scheduleStatusConstants.MODULE_NAME, ["scheduleStatuses"]),
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
    searchScheduleStatus() {
      this.source = axiosSourceToken.obterToken();
      scheduleStatusActions.search(this.source);
    },
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
    this.NOT_SELECTED = NOT_SELECTED;
    this.searchScheduleStatus();
  },
};
</script>