<template>
  <v-card :loading="loading" :disabled="disabled">
    <v-card-title class="d-flex align-start">
      <span class="overline">
        {{ $t(SCHEDULE.CARD_PRODUCTS.NAME) }}
      </span>
    </v-card-title>

    <div v-if="products.length > 0">
      <span class="overline">
        {{ $t(SCHEDULE.CARD_PRODUCTS.LABELS.TOTAL) }}:
      </span>
      <span class="overline ml-2">{{ toCurrency(calcTotal()) }}</span>
    </div>

    <v-card-text>
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.product.id"
          cols="12"
          sm="12"
          md="4"
          lg="4"
        >
          <material-schedules-product-item v-bind:product="product" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { ToCurrency } from "@/utils/methods";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["loading", "disabled", "products"],
  methods: {
    calcTotal() {
      if (this.products.length == 0) return 0;

      let p = this.products.map((cur) => {
        return cur.qty * cur.price;
      });

      return p.reduce((acc, cur) => acc + cur);
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>