<template>
  <v-card :loading="loading" :disabled="disabled">
    <v-card-title class="d-flex align-start">
      <span class="overline">
        {{ $t(SCHEDULE.ADD.CARD_PRODUCTS.NAME) }}
      </span>
      <v-spacer></v-spacer>
      <v-btn
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
        {{ $t(SCHEDULE.ADD.CARD_PRODUCTS.LABELS.TOTAL) }}:
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
          md="12"
          lg="12"
        >
          <material-schedules-add-product-item
            v-bind:product="product"
            @delete="removeProduct"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <material-schedules-add-product-add
      :showAdd="showAdd"
      @close="showAdd = false"
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
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showAdd: false,
      products: [],
    };
  },
  props: ["loading", "disabled"],
  methods: {
    getCurrPrice(product) {
      return product.onSale ? product.promotionalPrice : product.price;
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
      else
        toastr.error(
          this.$t(this.SCHEDULE.ADD.CARD_PRODUCTS.MESSAGES.CAN_NOT_ADD)
        );
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
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>