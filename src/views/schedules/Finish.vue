<template>
  <div>
    <core-page-title :title="$t(SCHEDULE.FINISH.NAME)">
      <v-col cols="auto">
        <v-btn
          color="error"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="SCHEDULES"
          exact
        >
          <v-icon>mdi-cancel</v-icon>
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
              {{ $t(SCHEDULE.FINISH.LABELS.TOTAL) }}
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
    <validation-observer ref="form" v-slot="{ handleSubmit }" @submit.prevent>
      <v-row>
        <v-col cols="12">
          <material-schedules-card-materials
            :materials="materials"
            :loading="
              loading[LOADING_IDENTIFIER_MATERIALS] ||
              loading[LOADING_IDENTIFIER]
            "
            :disabled="
              loading[LOADING_IDENTIFIER_MATERIALS] ||
              loading[LOADING_IDENTIFIER]
            "
          />
        </v-col>
      </v-row>
      <v-btn
        color="success"
        submit
        fab
        fixed
        right
        bottom
        @click="handleSubmit(onSave)"
        :loading="
          loading[LOADING_IDENTIFIER_MATERIALS] || loading[LOADING_IDENTIFIER]
        "
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </validation-observer>
  </div>
</template>

<script>
import agendaActions from "@/actions/agendaActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import agendaConstants from "@/store/modules/agenda/constants";
import { SCHEDULES } from "@/router/routes";
import {
  ToCurrency,
  checkDisabledCancelScheduleFromStatus,
} from "@/utils/methods";
import i18nConstants from "@/i18n/constants";
import toastr from "@/utils/toastr";

export default {
  data() {
    return {
      source: "",
      LOADING_IDENTIFIER: "searchSchedule",
      LOADING_IDENTIFIER_MATERIALS: "searchScheduleMaterials",
      SCHEDULES: SCHEDULES,
    };
  },
  methods: {
    onSave() {
      let id = this.$route.params.id;

      let materials = this.materials.map((e) => {
        return { idMaterial: e.idMaterial, qty: e.qtyUsed };
      });

      agendaActions
        .finish(id, { materials: materials }, this.LOADING_IDENTIFIER)
        .then((res) => {
          if (res.success) this.$router.push(SCHEDULES);
        });
    },
    toCurrency(value) {
      return ToCurrency(value, false, false);
    },
    searchSchedule() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      agendaActions.get(id, this.source, this.LOADING_IDENTIFIER);
    },
    getMaterials() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      agendaActions.getMaterials(
        id,
        this.source,
        this.LOADING_IDENTIFIER_MATERIALS
      );
    },
    checkStatus() {
      if (checkDisabledCancelScheduleFromStatus(this.schedule.status)) {
        this.$router.push(SCHEDULES);
        toastr.error(
          this.$t(i18nConstants.GENERAL.MESSAGES.RESOURCE_NOT_FOUND.TITLE)
        );
      }
    },
  },
  computed: {
    ...mapState(agendaConstants.MODULE_NAME, [
      "schedule",
      "materials",
      "search",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
  },
  created() {
    this.searchSchedule();
    this.getMaterials();
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
  watch: {
    schedule() {
      if (this.schedule) {
        this.checkStatus();
      }
    },
  },
};
</script>
