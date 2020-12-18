<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <span v-if="open" key="0"></span>
        <span v-else key="1" class="overline text-truncate">
          {{ combo.combo.name }}
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card-title>
          <span class="overline text-justify"> {{ combo.combo.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-row align="center" justify="space-between">
            <v-col cols="12" class="text-left">
              <span class="overline">{{ $t(GENERAL.LABELS.QTY) }}:</span>
              <span class="ml-2 caption">{{ combo.qty }}</span>
            </v-col>
            <v-col cols="12" class="text-left pt-0">
              <span class="overline">{{ $t(GENERAL.LABELS.PRICE) }}:</span>
              <span class="ml-2 caption">{{ toCurrency(combo.price) }}</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark
            icon
            :to="{
              name: COMBOS_DETAILS.name,
              params: { id: combo.combo.id },
            }"
            target="_blank"
          >
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { ToCurrency } from "@/utils/methods";
import { COMBOS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["combo"],
  data() {
    return {
      COMBOS_DETAILS: COMBOS_DETAILS,
    };
  },
  methods: {
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
  },
  created() {
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>