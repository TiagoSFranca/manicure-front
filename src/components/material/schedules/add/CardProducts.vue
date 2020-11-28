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

      <span class="overline ml-2">{{ toCurrency(calcTotal()) }}</span>
    </div>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            v-for="product in products"
            :key="product.product.id"
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <material-schedules-add-product-item
              v-bind:product="product"
              :showActions="isEdit"
              @delete="removeProduct"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <material-schedules-add-product-add
      :showAdd="showAdd"
      @fechar="showAdd = false"
      @addProduct="addProduct"
    />
  </v-card>
</template>

<script>
import combosActions from "@/actions/combosActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { ToCurrency } from "@/utils/methods";
import toastr from "@/utils/toastr";

export default {
  data() {
    return {
      showAdd: false,
      products: [],
    };
  },
  props: ["isLoading", "isEdit"],
  methods: {
    getCurrPrice(product) {
      return product.onSale ? product.saleValue : product.originalValue;
    },
    calcTotal() {
      if (this.products.length == 0) return 0;

      let p = this.products.map((cur) => {
        return cur.qty * this.getCurrPrice(cur.product);
      });

      return p.reduce((acc, cur) => acc + cur);
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    addProduct(object) {
      let keep =
        this.products.filter((e) => e.product.id == object.product.id).length >
        0;
      this.showAdd = keep;
      if (!keep) this.products.push(object);
      else toastr.error("Este produto já foi adicionado");
    },
    removeProduct(id) {
      let items = this.products.filter((e) => e.product.id != id);
      this.products = items;
    },
  },
  watch: {
    products() {
      this.$emit("changeProducts", this.products);
    },
  },
};
</script>