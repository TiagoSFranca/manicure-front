<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col cols="12">
      <v-col cols="auto">
        <lottie-player
          src="https://assets7.lottiefiles.com/temp/lf20_Jlg1O6.json"
          background="transparent"
          speed="2"
          style="height: 300px"
          loop
          autoplay
        ></lottie-player>
      </v-col>
      <v-col cols="auto">
        <span class="overline text-h5 white--text">
          <strong>{{ $t(GENERAL.MESSAGES.PAGE_NOT_FOUND.TITLE) }}</strong>
        </span>
      </v-col>
      <v-col cols="12">
        <span class="caption">
          {{ $t(GENERAL.MESSAGES.PAGE_NOT_FOUND.MESSAGE) }}
        </span>
      </v-col>
      <v-col cols="12">
        <v-btn outlined color="primary" :to="DASHBOARD" exact>
          <v-icon left>mdi-arrow-left</v-icon>
          {{ $t(GENERAL.MESSAGES.PAGE_NOT_FOUND.COME_BACK) }}
        </v-btn>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import { DASHBOARD } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      DASHBOARD: DASHBOARD,
    };
  },
  created() {
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>