<template>
  <v-card :loading="isLoading">
    <v-card-title>
      <span class="overline">{{ $t(PRODUCT.CARD_COMBOS.NAME) }}</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="combo in combos"
          :key="combo.id"
          cols="12"
          sm="12"
          md="4"
          lg="3"
        >
          <material-products-combo-item v-bind:combo="combo" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["combos", "isLoading"],
  methods: {
    seeCombo(combo) {
      this.$router.push({ path: "/GOOGLE".replace(":id", combo.id) });
    },
  },
  created() {
    this.PRODUCT = i18nConstants.PRODUCT;
  },
};
</script>