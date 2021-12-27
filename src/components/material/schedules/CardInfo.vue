<template>
  <div>
    <form>
      <v-card :disabled="disabled" :loading="isLoading">
        <v-card-title>
          <span class="overline">
            {{ $t(SCHEDULE.CARD_INFO.NAME) }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-row align="start">
            <v-col cols="4" md="2" lg="2">
              <common-date-picker
                :date="object.date"
                :label="$t(SCHEDULE.CARD_INFO.LABELS.DATE)"
                :min="new Date().toJSON()"
                v-model="object.date"
                :disabled="true"
              />
            </v-col>
            <v-col cols="6" md="8" lg="8">
              <v-text-field
                :label="$t(SCHEDULE.CARD_INFO.LABELS.CLIENT)"
                v-model="object.client.name"
                readonly
                append-outer-icon="mdi-eye-outline"
                @click:append-outer="seeClient"
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" md="2" lg="2">
              <v-checkbox
                v-model="object.inLoco"
                :label="$t(SCHEDULE.CARD_INFO.LABELS.IN_LOCO)"
                readonly
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </form>
  </div>
</template>

<script>
import { CLIENTS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["isLoading", "disabled", "object"],
  methods: {
    seeClient() {
      let routeData = this.$router.resolve({
        name: CLIENTS_DETAILS.name,
        params: { id: this.object.idClient },
      });
      window.open(routeData.href, "_blank");
    },
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>
