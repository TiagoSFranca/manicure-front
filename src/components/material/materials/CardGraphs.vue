<template>
  <div>
    <v-row justify="end">
      <v-col cols="12" md="2" lg="2">
        <v-select
          :items="years"
          v-model="yearSelected"
          :label="$t(MATERIAL.DETAILS.LABELS.YEAR)"
          :loading="
            loading[LOADING_IDENTIFIER_YEARS] ||
            loading[LOADING_IDENTIFIER_REPORT_REGISTER] ||
            loading[LOADING_IDENTIFIER_REPORT_REMOVE]
          "
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="6" md="6">
        <v-row>
          <v-col cols="6" sm="6" lg="6" md="6">
            <common-simple-card
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_REGISTER]
              "
              :title="
                $t(MATERIAL.DETAILS.LABELS.REGISTER_IN_YEAR, {
                  year: yearSelected,
                })
              "
            >
              <span class="title white--text">
                {{ reportRegisterYear.totalInYear }}
              </span>
            </common-simple-card>
          </v-col>
          <v-col cols="6" sm="6" lg="6" md="6">
            <common-simple-card
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_REGISTER]
              "
              :title="$t(MATERIAL.DETAILS.LABELS.REGISTER_TOTAL)"
            >
              <span class="title white--text">
                {{ reportRegisterYear.total }}
              </span>
            </common-simple-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <material-materials-card-graph
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_REGISTER]
              "
              :labels="labels"
              :series="getRegisters()"
              :colors="[randomColor()]"
              :title="
                $t(MATERIAL.DETAILS.LABELS.REGISTER_IN_YEAR, {
                  year: yearSelected,
                })
              "
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" lg="6" md="6">
        <v-row>
          <v-col cols="6" sm="6" lg="6" md="6">
            <common-simple-card
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_REMOVE]
              "
              :title="
                $t(MATERIAL.DETAILS.LABELS.REMOVE_IN_YEAR, {
                  year: yearSelected,
                })
              "
            >
              <span class="title white--text">
                {{ reportRemoveYear.totalInYear }}
              </span>
            </common-simple-card>
          </v-col>
          <v-col cols="6" sm="6" lg="6" md="6">
            <common-simple-card
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_REMOVE]
              "
              :title="$t(MATERIAL.DETAILS.LABELS.REMOVE_TOTAL)"
            >
              <span class="title white--text">
                {{ reportRemoveYear.total }}
              </span>
            </common-simple-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <material-materials-card-graph
              :isLoading="
                loading[LOADING_IDENTIFIER_YEARS] ||
                loading[LOADING_IDENTIFIER_REPORT_REMOVE]
              "
              :labels="labels"
              :series="getRemoves()"
              :colors="[randomColor()]"
              :title="
                $t(MATERIAL.DETAILS.LABELS.REMOVE_IN_YEAR, {
                  year: yearSelected,
                })
              "
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import materialsActions from "@/actions/materialsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import { MATERIALS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import moment from "moment";
import { randomColor } from "@/utils/methods";

export default {
  data() {
    return {
      source: "",
      LOADING_IDENTIFIER_YEARS: "searchMaterialYears",
      LOADING_IDENTIFIER_REPORT_REGISTER: "searchMaterialReportRegister",
      LOADING_IDENTIFIER_REPORT_REMOVE: "searchMaterialReportRemove",
      MATERIALS: MATERIALS,
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
      randomColor: randomColor,
    };
  },
  methods: {
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_SET_REPORT_REGISTER_YEAR,
      materialsConstants.MUTATION_SET_REPORT_REMOVE_YEAR,
    ]),
    searchYears() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      materialsActions.getYears(id, this.source, this.LOADING_IDENTIFIER_YEARS);
    },
    searchReports() {
      this.searchReportRegisterYear();
      this.searchReportRemoveYear();
    },
    searchReportRegisterYear() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      materialsActions.getReportRegisterYear(
        id,
        this.yearSelected,
        this.source,
        this.LOADING_IDENTIFIER_REPORT_REGISTER,
        true
      );
    },
    searchReportRemoveYear() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      materialsActions.getReportRemoveYear(
        id,
        this.yearSelected,
        this.source,
        this.LOADING_IDENTIFIER_REPORT_REMOVE,
        false
      );
    },
    getRegisters() {
      let registers = (this.reportRegisterYear.months || []).map((e) => e.value);
      return [
        {
          name: this.$t(this.MATERIAL.DETAILS.LABELS.REGISTER),
          data: registers,
        },
      ];
    },
    getRemoves() {
      let removes = (this.reportRemoveYear.months || []).map((e) => e.value);
      return [
        {
          name: this.$t(this.MATERIAL.DETAILS.LABELS.REMOVE),
          data: removes,
        },
      ];
    },
  },
  created() {
    this[materialsConstants.MUTATION_SET_REPORT_REGISTER_YEAR]({});
    this[materialsConstants.MUTATION_SET_REPORT_REMOVE_YEAR]({});
    this.searchYears();
    this.searchReports();
    this.MATERIAL = i18nConstants.MATERIAL;
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, [
      "years",
      "reportRegisterYear",
      "reportRemoveYear",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    yearSelected() {
      this.searchReports();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
