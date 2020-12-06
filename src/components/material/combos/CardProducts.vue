<template>
  <v-card :loading="isLoading">
    <v-card-title class="d-flex align-start">
      <span class="overline">produtos</span>
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
      <span class="overline">Soma dos produtos:</span>

      <span class="overline ml-2">{{ calcTotal() }}</span>
    </div>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            sm="12"
            md="4"
            lg="3"
          >
            <material-combos-product-item
              v-bind:product="product"
              :showActions="isEdit"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <material-combos-product-add :showAdd="showAdd" @fechar="showAdd = false" />
  </v-card>
</template>

<script>
import combosActions from "@/actions/combosActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { ToCurrency } from "@/utils/methods";

export default {
  data() {
    return {
      showAdd: false,
    };
  },
  props: ["products", "isLoading", "isEdit", "height"],
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
};
</script>