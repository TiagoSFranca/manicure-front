<template>
  <v-card :loading="isLoading">
    <v-card-title class="d-flex align-start">
      <span class="overline">{{ $t(COMBO.CARD_PRODUCTS.NAME) }}</span>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isEdit"
        color="accent"
        outlined
        rounded
        dark
        small
        icon
        @click="showAdd = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>

    <div v-if="products.length > 0">
      <span class="overline">
        {{ $t(COMBO.CARD_PRODUCTS.LABELS.TOTAL) }}:
      </span>

      <span class="overline ml-2">{{ calcTotal() }}</span>
    </div>

    <v-card-text>
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="12"
          md="4"
          lg="4"
        >
          <material-combos-product-item
            v-bind:product="product"
            :showActions="isEdit"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <material-combos-product-add :showAdd="showAdd" @close="showAdd = false" />
  </v-card>
</template>

<script>
import { ToCurrency } from "@/utils/methods";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showAdd: false,
    };
  },
  props: ["products", "isLoading", "isEdit"],
  methods: {
    getCurrPrice(product) {
      return product.onSale ? product.promotionalPrice : product.price;
    },
    calcTotal() {
      let p = this.products.map((cur) => {
        return cur.qty * this.getCurrPrice(cur.product);
      });

      return ToCurrency(
        p.reduce((acc, cur) => acc + cur),
        true,
        false
      );
    },
  },
  created() {
    this.COMBO = i18nConstants.COMBO;
  },
};
</script>