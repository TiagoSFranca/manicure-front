<template>
  <div>
    <v-row class="mt-3">
      <v-col cols="12">
        <material-index-agenda />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12"> <material-index-card-warning-stock-materials /> </v-col>
    </v-row>

    <v-row>
      <v-col md="8" sm="12">
        <material-index-card-late-schedules />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8" offset-md="4" sm="12" offset-sm="0">
        <material-index-card-products-on-sale />
      </v-col>
      <v-col md="8" sm="12">
        <material-index-card-combos-on-sale />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import i18nConstants from "@/i18n/constants";
import agendaConstants from "@/store/modules/agenda/constants";
import { mapState } from "vuex";

export default {
  created() {
    this[i18nConstants.INITIAL_MESSAGE] = i18nConstants.INITIAL_MESSAGE;
  },
  computed: {},
};
</script>
