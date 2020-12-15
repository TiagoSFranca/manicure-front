<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <core-page-title :title="$t(MATERIAL.EDIT.NAME)">
          <v-col cols="auto" class="ml-auto">
            <v-btn
              color="error"
              outlined
              icon
              large
              :loading="loading[LOADING_IDENTIFIER]"
              :to="MATERIALS"
              exact
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
        </core-page-title>
        <v-row>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-materials-card-info
              :isEdit="false"
              :isLoading="loading[LOADING_IDENTIFIER]"
              :object="material"
              :showActions="false"
            />
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <v-row justify="end">
          <v-col cols="12" md="2" lg="2">
            <v-select
              :items="years"
              v-model="yearSelected"
              label="Ano"
              :loading="loading[LOADING_IDENTIFIER_YEARS]"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" lg="6" md="6">
            <v-row>
              <v-col cols="6" sm="6" lg="6" md="6">
                <common-simple-card
                  :isLoading="loading[LOADING_IDENTIFIER_YEARS]"
                  title="Registros em 2020"
                >
                  <span class="title white--text">
                    {{ reportYear.totalRegisterYear }}
                  </span>
                </common-simple-card>
              </v-col>
              <v-col cols="6" sm="6" lg="6" md="6">
                <common-simple-card
                  :isLoading="loading[LOADING_IDENTIFIER_YEARS]"
                  title="Registros totais"
                >
                  <span class="title white--text">
                    {{ reportYear.totalRegister }}
                  </span>
                </common-simple-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <material-materials-card-graphs
                  :isLoading="loading[LOADING_IDENTIFIER_YEARS]"
                  :labels="labels"
                  :datasets="getRegisters()"
                  title="Registros em 2020"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="12" lg="6" md="6">
            <v-row>
              <v-col cols="6" sm="6" lg="6" md="6">
                <common-simple-card
                  :isLoading="loading[LOADING_IDENTIFIER_YEARS]"
                  title="Remoçãos em 2020"
                >
                  <span class="title white--text">
                    {{ reportYear.totalRemove }}
                  </span>
                </common-simple-card>
              </v-col>
              <v-col cols="6" sm="6" lg="6" md="6">
                <common-simple-card
                  :isLoading="loading[LOADING_IDENTIFIER_YEARS]"
                  title="Remoção total"
                >
                  <span class="title white--text">
                    {{ reportYear.totalRemove }}
                  </span>
                </common-simple-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <material-materials-card-graphs
                  :isLoading="loading[LOADING_IDENTIFIER_YEARS]"
                  :labels="labels"
                  :datasets="getRemoves()"
                  title="Remoção em 2020"
                  key="151"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
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
      LOADING_IDENTIFIER: "searchMaterial",
      LOADING_IDENTIFIER_YEARS: "searchMaterialYears",
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
    };
  },
  methods: {
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_SET_REPORT_YEAR,
    ]),
    searchMaterial() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      materialsActions.get(id, this.source, this.LOADING_IDENTIFIER);
    },
    searchYears() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      materialsActions.getYears(id, this.source, this.LOADING_IDENTIFIER_YEARS);
    },
    searchReportYear() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      materialsActions.getReportYear(
        id,
        this.yearSelected,
        this.source,
        this.LOADING_IDENTIFIER_YEARS
      );
    },
    getRegisters() {
      var registers = (this.reportYear.register || []).map((e) => e.value);
      return [
        {
          label: "Registros",
          backgroundColor: randomColor(),
          data: registers,
        },
      ];
    },
    getRemoves() {
      var registers = (this.reportYear.remove || []).map((e) => e.value);
      return [
        {
          label: "remoções",
          backgroundColor: randomColor(),
          data: registers,
        },
      ];
    },
  },
  created() {
    this[materialsConstants.MUTATION_SET_REPORT_YEAR]({});
    this.searchMaterial();
    this.searchYears();
    this.searchReportYear();
    this.MATERIAL = i18nConstants.MATERIAL;
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, [
      "material",
      "search",
      "years",
      "reportYear",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    search(val) {
      if (val) this.searchMaterial();
    },
    yearSelected() {
      this.searchReportYear();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
