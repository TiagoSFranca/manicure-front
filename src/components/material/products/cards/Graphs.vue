<template>
  <div>
    <v-row justify="end">
      <v-col cols="12" md="2" lg="2">
        <v-select
          :items="scheduleYears"
          v-model="yearSelected"
          :label="$t(PRODUCT.CARD_GRAPHS.LABELS.YEAR)"
          :loading="
            loading[LOADING_IDENTIFIER_YEARS] ||
            loading[LOADING_IDENTIFIER_REPORT_SCHEDULE_FINISHED] ||
            loading[LOADING_IDENTIFIER_REPORT_SCHEDULE_CANCELED]
          "
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <v-row>
          <v-col cols="6" sm="6" lg="3" md="3">
            <common-simple-card
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_SCHEDULE_FINISHED]
              "
              :title="
                $t(PRODUCT.CARD_GRAPHS.LABELS.SCHEDULE_FINISHED_IN_YEAR, {
                  year: yearSelected,
                })
              "
            >
              <span class="title white--text">
                {{ reportScheduleFinishedYear.totalInYear }}
              </span>
            </common-simple-card>
          </v-col>
          <v-col cols="6" sm="6" lg="3" md="3">
            <common-simple-card
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_SCHEDULE_FINISHED]
              "
              :title="$t(PRODUCT.CARD_GRAPHS.LABELS.SCHEDULE_FINISHED_TOTAL)"
            >
              <span class="title white--text">
                {{ reportScheduleFinishedYear.total }}
              </span>
            </common-simple-card>
          </v-col>
          <v-col cols="6" sm="6" lg="3" md="3">
            <common-simple-card
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_SCHEDULE_CANCELED]
              "
              :title="
                $t(PRODUCT.CARD_GRAPHS.LABELS.SCHEDULE_CANCELED_IN_YEAR, {
                  year: yearSelected,
                })
              "
            >
              <span class="title white--text">
                {{ reportScheduleCanceledYear.totalInYear }}
              </span>
            </common-simple-card>
          </v-col>
          <v-col cols="6" sm="6" lg="3" md="3">
            <common-simple-card
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_SCHEDULE_CANCELED]
              "
              :title="$t(PRODUCT.CARD_GRAPHS.LABELS.SCHEDULE_CANCELED_TOTAL)"
            >
              <span class="title white--text">
                {{ reportScheduleCanceledYear.total }}
              </span>
            </common-simple-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <common-card-graph
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_SCHEDULE_FINISHED]
              "
              :labels="labels"
              :series="getRegisters()"
              :colors="[
                $vuetify.theme.themes.dark.success,
                $vuetify.theme.themes.dark.error,
              ]"
              :title="
                $t(
                  PRODUCT.CARD_GRAPHS.LABELS
                    .SCHEDULE_FINISHED_AND_CANCELED_IN_YEAR,
                  {
                    year: yearSelected,
                  }
                )
              "
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import productsActions from "@/actions/productsActions";

import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";
import { PRODUCTS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import moment from "moment";
import { randomColor } from "@/utils/methods";

export default {
  data() {
    return {
      LOADING_IDENTIFIER_YEARS: "searchScheduleYears",
      LOADING_IDENTIFIER_REPORT_SCHEDULE_FINISHED:
        "searchReportScheduleFinished",
      LOADING_IDENTIFIER_REPORT_SCHEDULE_CANCELED:
        "searchReportScheduleCanceled",
      yearSelected: moment().year(),
      labels: [
        "jan",
        "feb",
        "mar",
        "abr",
        "mai",
        "jun",
        "jul",
        "ago",
        "set",
        "out",
        "nov",
        "dez",
      ],
    };
  },
  methods: {
    ...mapMutations(productsConstants.MODULE_NAME, [
      productsConstants.MUTATION_SET_REPORT_SCHEDULE_FINISHED_YEAR,
      productsConstants.MUTATION_SET_REPORT_SCHEDULE_CANCELED_YEAR,
    ]),
    searchYears() {
      let id = this.$route.params.id;
      productsActions.getScheduleYears(id, this.LOADING_IDENTIFIER_YEARS);
    },
    searchReports() {
      this.searchReportScheduleFinishedYear();
      this.searchReportScheduleCanceledYear();
    },
    searchReportScheduleFinishedYear() {
      let id = this.$route.params.id;
      productsActions.getReportScheduleFinishedYear(
        id,
        this.yearSelected,
        this.LOADING_IDENTIFIER_REPORT_SCHEDULE_FINISHED,
        true
      );
    },
    searchReportScheduleCanceledYear() {
      let id = this.$route.params.id;
      productsActions.getReportScheduleCanceledYear(
        id,
        this.yearSelected,
        this.LOADING_IDENTIFIER_REPORT_SCHEDULE_CANCELED,
        false
      );
    },
    getRegisters() {
      let registers = (this.reportScheduleFinishedYear.months || []).map(
        (e) => e.value
      );
      let removes = (this.reportScheduleCanceledYear.months || []).map(
        (e) => e.value
      );
      return [
        {
          name: this.$t(this.PRODUCT.CARD_GRAPHS.LABELS.SCHEDULE_FINISHED),
          data: registers,
        },
        {
          name: this.$t(this.PRODUCT.CARD_GRAPHS.LABELS.SCHEDULE_CANCELED),
          data: removes,
        },
      ];
    },
  },
  created() {
    this[productsConstants.MUTATION_SET_REPORT_SCHEDULE_FINISHED_YEAR]({});
    this[productsConstants.MUTATION_SET_REPORT_SCHEDULE_CANCELED_YEAR]({});
    this.searchYears();
    this.searchReports();
    this.PRODUCT = i18nConstants.PRODUCT;
    this.PRODUCTS = PRODUCTS;
    this.randomColor = randomColor;
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, [
      "scheduleYears",
      "reportScheduleFinishedYear",
      "reportScheduleCanceledYear",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    yearSelected() {
      this.searchReports();
    },
  },
};
</script>
