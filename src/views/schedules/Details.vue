<template>
  <div>
    <core-page-title :title="$t(SCHEDULE.DETAILS.NAME)">
      <v-col cols="auto">
        <v-btn
          icon
          large
          color="success"
          :to="{
            name: SCHEDULES_FINISH.name,
            params: { id: $route.params.id },
          }"
          v-if="!setCancelDisabled()"
          :loading="loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
          icon
          large
          color="error"
          @click="cancel()"
          v-if="!setCancelDisabled()"
          :loading="loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="SCHEDULES"
          exact
        >
          <v-icon>{{ SCHEDULES.icon }}</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>

    <v-row align="center">
      <v-col cols="12" sm="12" lg="9" md="9">
        <material-schedules-card-info
          :object="schedule"
          :disabled="loading[LOADING_IDENTIFIER]"
          :isLoading="loading[LOADING_IDENTIFIER]"
        />
      </v-col>
      <v-col cols="12" sm="12" lg="3" md="3">
        <v-card class="bgcolor-unset" elevation="0">
          <v-card-text
            class="d-flex align-content-center flex-wrap justify-center"
          >
            <span class="overline d-flex align-content-center flex-wrap">
              {{ $t(SCHEDULE.DETAILS.LABELS.TOTAL) }}
            </span>
            <common-span-loading
              classes="overline ml-2 text-h4 primary--text"
              color="primary"
              :loading="loading[LOADING_IDENTIFIER]"
            >
              {{ toCurrency(schedule.price) }}
            </common-span-loading>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-schedules-card-products
          :products="products"
          :disabled="loading[LOADING_IDENTIFIER_PRODUCTS]"
          :loading="loading[LOADING_IDENTIFIER_PRODUCTS]"
        />
      </v-col>
    </v-row>
    <v-row v-if="combos.length > 0">
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-schedules-card-combos
          :combos="combos"
          :disabled="loading[LOADING_IDENTIFIER_COMBOS]"
          :loading="loading[LOADING_IDENTIFIER_COMBOS]"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-schedules-card-questions
          :disabled="loading[LOADING_IDENTIFIER]"
          :loading="loading[LOADING_IDENTIFIER]"
          :questions="schedule.scheduleQuestion"
          :readonly="true"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <material-schedules-card-materials
          :materials="materials"
          :loading="
            loading[LOADING_IDENTIFIER_MATERIALS] || loading[LOADING_IDENTIFIER]
          "
          :disabled="
            loading[LOADING_IDENTIFIER_MATERIALS] || loading[LOADING_IDENTIFIER]
          "
          :readonly="true"
        />
      </v-col>
    </v-row>
    <material-schedules-cancel
      :showCancel="showCancel"
      @close="showCancel = false"
      :schedule="schedule"
    />
  </div>
</template>

<script>
import agendaActions from "@/actions/agendaActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import agendaConstants from "@/store/modules/agenda/constants";
import { SCHEDULES, SCHEDULES_FINISH } from "@/router/routes";
import {
  ToCurrency,
  checkDisabledCancelScheduleFromStatus,
} from "@/utils/methods";
import i18nConstants from "@/i18n/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      LOADING_IDENTIFIER: "searchSchedule",
      LOADING_IDENTIFIER_MATERIALS: "searchScheduleMaterials",
      LOADING_IDENTIFIER_PRODUCTS: "searchScheduleProducts",
      LOADING_IDENTIFIER_COMBOS: "searchScheduleCombos",
      SCHEDULES: SCHEDULES,
      SCHEDULES_FINISH: SCHEDULES_FINISH,
      showCancel: false,
    };
  },
  methods: {
    toCurrency(value) {
      return ToCurrency(value, false, false);
    },
    searchSchedule() {
      let id = this.$route.params.id;
      agendaActions.get(id, uuidv4(), this.LOADING_IDENTIFIER);
    },
    getMaterials() {
      let id = this.$route.params.id;
      agendaActions.getMaterials(
        id,
        uuidv4(),
        this.LOADING_IDENTIFIER_MATERIALS
      );
    },
    getProducts() {
      let id = this.$route.params.id;
      agendaActions.getProducts(id, uuidv4(), this.LOADING_IDENTIFIER_PRODUCTS);
    },
    getCombos() {
      let id = this.$route.params.id;
      agendaActions.getCombos(id, uuidv4(), this.LOADING_IDENTIFIER_COMBOS);
    },
    cancel() {
      this.showCancel = true;
    },
    setCancelDisabled() {
      return this.schedule
        ? checkDisabledCancelScheduleFromStatus(this.schedule.status)
        : true;
    },
  },
  computed: {
    ...mapState(agendaConstants.MODULE_NAME, [
      "schedule",
      "materials",
      "products",
      "combos",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  created() {
    this.searchSchedule();
    this.getMaterials();
    this.getProducts();
    this.getCombos();
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>
