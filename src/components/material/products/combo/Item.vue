<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <span key="1" :class="`overline ${!open ? 'text-truncate' : ''}`">
          {{ combo.combo.name }}
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-spacer></v-spacer>
        <v-tooltip bottom v-if="combo.combo.onSale">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="warning" v-bind="attrs" v-on="on"> mdi-sale </v-icon>
          </template>
          <span>{{ $t(GENERAL.LABELS.ON_SALE) }}</span>
        </v-tooltip>
        <v-row align="start" no-gutters v-if="combo.combo.comments">
          <v-col cols="12" class="text-left">
            <span class="caption"> {{ combo.combo.comments }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            dark
            icon
            target="_blank"
            :to="{
              name: COMBOS_DETAILS.name,
              params: { id: combo.idCombo },
            }"
          >
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { COMBOS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["combo"],
  data() {
    return {
      COMBOS_DETAILS: COMBOS_DETAILS,
    };
  },
  created() {
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>