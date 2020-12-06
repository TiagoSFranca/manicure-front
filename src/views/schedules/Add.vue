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

        <validation-observer
          ref="form"
          v-slot="{ handleSubmit }"
          @submit.prevent
        >
          <v-row align="center">
            <v-col cols="12" sm="12" lg="9" md="9">
              <material-schedules-add-card-info
                @changeInfo="changeInfo"
                :disabled="loading[LOADING_IDENTIFIER]"
                :isLoading="loading[LOADING_IDENTIFIER]"
              />
            </v-col>
            <v-col cols="12" sm="12" lg="3" md="3">
              <v-card class="bgcolor-unset" elevation="0">
                <v-card-text
                  class="d-flex align-content-center flex-wrap justify-center"
                >
                  <span class="overline d-flex align-content-center flex-wrap"
                    >Total</span
                  >
                  <span class="overline ml-2 text-h4 primary--text">
                    {{ toCurrency(calcTotalProducts() + calcTotalCombos()) }}
                  </span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-btn
            color="success"
            submit
            fab
            fixed
            right
            bottom
            @click="handleSubmit(onSave)"
            :loading="loading[LOADING_IDENTIFIER]"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </validation-observer>
        <v-row>
          <v-col cols="12" sm="12" lg="6" md="6">
            <material-schedules-add-card-products
              :products="products"
              @changeProducts="changeProducts"
              :disabled="loading[LOADING_IDENTIFIER]"
              :loading="loading[LOADING_IDENTIFIER]"
            />
          </v-col>
          <v-col cols="12" sm="12" lg="6" md="6">
            <material-schedules-add-card-combos
              :combos="combos"
              :isEdit="true"
              @changeCombos="changeCombos"
              :disabled="loading[LOADING_IDENTIFIER]"
              :loading="loading[LOADING_IDENTIFIER]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-schedules-add-card-questions
              :disabled="loading[LOADING_IDENTIFIER]"
              :loading="loading[LOADING_IDENTIFIER]"
              :questions="questions"
            />
          </v-col>
        </v-row>
      </v-flex>
      <material-schedules-add-verify-stock-error
        :showError="showError"
        :stockErrors="stockErrors"
        @fechar="showError = false"
        @confirm="save"
        :disabled="loading[LOADING_IDENTIFIER]"
        :isLoading="loading[LOADING_IDENTIFIER]"
      />
    </v-layout>
  </v-container>
</template>

<script>
import agendaActions from "@/actions/agendaActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { SCHEDULES } from "@/router/routes";
import { ToCurrency } from "@/utils/methods";
import toastr from "@/utils/toastr";

export default {
  data() {
    return {
      showError: false,
      source: "",
      LOADING_IDENTIFIER: "searchCombo",
      object: {},
      products: [],
      combos: [],
      questions: {
        format: "n",
        color: "n",
        hasOnychomycosis: false,
        useOnychomycosisMedicine: false,
        onychomycosisMedicine: null,
        diabetes: false,
        allergy: false,
        allergyMedicine: null,
        anticoagulantMedication: null,
        comments: null,
      },
      stockErrors: {},
      requestObject: {},
    };
  },
  methods: {
    onSave() {
      if (this.products.length == 0 && this.combos.length == 0) {
        toastr.error("Necessário adicionar ao menos um produto ou combo");
        this.$refs.form.reset();
      } else {
        let products = this.products.map((item) => {
          return { id: item.idProduct, qty: item.qty };
        });
        let combos = this.combos.map((item) => {
          return { id: item.idCombo, qty: item.qty };
        });

        this.requestObject = {
          ...this.object,
          products: products,
          combos: combos,
          questions: this.questions,
        };

        agendaActions
          .checkStock(this.requestObject, this.LOADING_IDENTIFIER)
          .then((res) => {
            if (res.success) {
              this.save();
            } else {
              this.showError = true;
              this.stockErrors = res;
            }
          });
      }
    },
    save() {
      this.showError = false;
      agendaActions
        .add(this.requestObject, this.LOADING_IDENTIFIER)
        .then((res) => {
          if (res.success) {
            console.log("SALVOU");
          } else {
            console.log("NÂO SALVOU");
          }
        });
    },
    comeBack() {
      this.$router.push({ path: SCHEDULES });
    },
    changeProducts(products) {
      this.products = products;
    },
    changeCombos(combos) {
      this.combos = combos;
    },
    changeInfo(info) {
      this.object = info;
      this.$refs.form.reset();
    },
    toCurrency(value) {
      return ToCurrency(value, false, false);
    },
    getCurrPriceProduct(product) {
      return product.onSale ? product.promotionalPrice : product.price;
    },
    calcTotalProducts() {
      if (this.products.length == 0) return 0;

      let p = this.products.map((cur) => {
        return cur.qty * this.getCurrPriceProduct(cur.product);
      });

      return p.reduce((acc, cur) => acc + cur);
    },
    getCurrPriceCombo(combo) {
      return combo.onSale ? combo.promotionalPrice : combo.price;
    },
    calcTotalCombos() {
      if (this.combos.length == 0) return 0;

      let p = this.combos.map((cur) => {
        return cur.qty * this.getCurrPriceCombo(cur.combo);
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
  mounted() {
    this.source = axiosSourceToken.obterToken();
  },
};
</script>
