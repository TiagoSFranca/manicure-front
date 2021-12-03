<template>
  <div>
    <v-row>
      <v-col cols="12"> Grafico faturamento</v-col>
    </v-row>
    <v-row>
      <v-col cols="4"> Top 10 produtos</v-col>
      <v-col cols="4"> Top 10 combos</v-col>
      <v-col cols="4"> Top 10 clientes</v-col>
    </v-row>
  </div>
</template>

<script>
import i18nConstants from "@/i18n/constants";
export default {
  created() {
    this[i18nConstants.INITIAL_MESSAGE] = i18nConstants.INITIAL_MESSAGE;
  },
};
</script>
