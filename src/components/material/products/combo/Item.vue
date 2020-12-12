<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-fade-transition leave-absolute>
          <span v-if="open" key="0"></span>
          <span v-else key="1" class="overline text-truncate">
            {{ combo.combo.name }}
          </span>
        </v-fade-transition>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card-title>
          <span class="overline text-justify"> {{ combo.combo.name }}</span>
          <v-spacer></v-spacer>
          <v-tooltip bottom v-if="combo.combo.onSale">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="warning" v-bind="attrs" v-on="on">
                mdi-sale
              </v-icon>
            </template>
            <span>{{ $t(GENERAL.LABELS.ON_SALE) }}</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-row align="start">
            <v-col cols="12" class="text-left">
              <span class="caption"> {{ combo.combo.comments }}</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark icon @click="seeCombo(combo.combo)">
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { COMBOS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["combo"],
  methods: {
    seeCombo(combo) {
      let routeData = this.$router.resolve({
        path: COMBOS_DETAILS.replace(":id", combo.id),
      });
      window.open(routeData.href, "_blank");
    },
  },
  created() {
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>