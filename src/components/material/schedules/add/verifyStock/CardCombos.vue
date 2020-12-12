<template>
  <v-card>
    <v-card-title>
      <span class="overline">{{ $tc(COMBO.NAME, 2) }}</span>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <combos
            v-for="combo in combos"
            :key="combo.idCombo"
            v-bind:combo="combo"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Combos from "./Combos.vue";
import i18nConstants from "@/i18n/constants";

export default {
  components: { Combos },
  props: ["combos"],
  created() {
    this.COMBO = i18nConstants.COMBO;
  },
};
</script>