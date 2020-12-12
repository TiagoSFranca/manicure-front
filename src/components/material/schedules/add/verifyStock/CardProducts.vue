<template>
  <v-card>
    <v-card-title>
      <span class="overline">{{ $tc(PRODUCT.NAME, 2) }}</span>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <product
            v-for="product in products"
            :key="product.idProduct"
            v-bind:product="product"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Product from "./Product.vue";
import i18nConstants from "@/i18n/constants";

export default {
  components: { Product },
  props: ["products"],
  created() {
    this.PRODUCT = i18nConstants.PRODUCT;
  },
};
</script>