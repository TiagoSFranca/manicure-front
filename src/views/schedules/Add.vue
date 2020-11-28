<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <v-row align="center">
          <v-col cols="auto" class="mr-auto">
            <span class="title white--text">Adicionar Agendamento</span>
          </v-col>

          <v-col cols="auto" class="ml-auto">
            <v-btn
              color="error"
              elevation="2"
              fab
              outlined
              rounded
              small
              :loading="loading[LOADING_IDENTIFIER]"
              @click="comeBack"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <validation-observer ref="form" v-slot="{ handleSubmit }">
          <v-row>
            <v-col cols="12" sm="12" lg="4" md="4">
              <material-schedules-add-card-info />
            </v-col>
            <v-col cols="12" sm="12" lg="4" md="4">
              <material-schedules-add-card-products
                :products="[]"
                :isEdit="true"
                @changeProducts="changeProducts"
              />
            </v-col>
            <v-col cols="12" sm="12" lg="4" md="4"> COMBOS </v-col>
          </v-row>
          <v-row justify="space-between" align="center">
            <v-col cols="auto">
              <v-card>
                <v-card-text>
                  <span class="overline">Total:</span>

                  <span class="overline ml-2">
                    {{ toCurrency(calcTotalProducts()) }}
                  </span>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="auto">
              <v-card>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error"
                    @click="hide()"
                    icon
                    fab
                    :loading="loading[LOADING_IDENTIFIER]"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-btn
                    color="success"
                    submit
                    icon
                    fab
                    @click="handleSubmit(save)"
                    :loading="loading[LOADING_IDENTIFIER]"
                  >
                    <v-icon>mdi-check</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </validation-observer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import combosActions from "@/actions/combosActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import { COMBOS } from "@/router/routes";
import { ToCurrency } from "@/utils/methods";
import toastr from "@/utils/toastr";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      LOADING_IDENTIFIER: "searchCombo",
      LOADING_IDENTIFIER_IMAGES: "searchComboImages",
      LOADING_IDENTIFIER_MATERIALS: "searchComboClients",
      object: {},
      products: [],
    };
  },
  methods: {
    save() {
      let id = this.$route.params.id;
      if (this.products.length == 0)
        toastr.error("Necessário adicionar ao menos um produto ou combo");
      // console.log("PROS", this.$refs.cardProducts.getProducts());
      // console.log("TOTAL PROS", this.$refs.cardProducts.calcTotal());
      // combosActions
      //   .addClient(id, this.object, this.LOADING_IDENTIFIER)
      //   .then((res) => {
      //     if (res) {
      //       this.hide();
      //     }
      //   });
    },
    comeBack() {
      this.$router.push({ path: COMBOS });
    },
    changeProducts(products) {
      this.products = products;
    },
    toCurrency(value) {
      return ToCurrency(value, false, false);
    },
    getCurrPriceProduct(product) {
      return product.onSale ? product.saleValue : product.originalValue;
    },
    calcTotalProducts() {
      if (this.products.length == 0) return 0;

      let p = this.products.map((cur) => {
        return cur.qty * this.getCurrPriceProduct(cur.product);
      });

      return p.reduce((acc, cur) => acc + cur);
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
