<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title>
            <span class="headline">Adicionar Produto ao Combo</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form>
                <v-row>
                  <v-col cols="9">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <common-autocomplete-remote
                        :loading="loading[LOADING_IDENTIFIER_SEARCH_PRODUCTS]"
                        :items="products"
                        :errors="errors"
                        label="Product"
                        :placeholder="`Digite ao menos ${minLength} chars para pesquisar`"
                        option-text="name"
                        option-value="id"
                        @search="searchProducts"
                        @select="selectProduct"
                        v-model="object.idProduct"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="3">
                    <validation-provider
                      rules="required|greater_than:0"
                      v-slot="{ errors }"
                    >
                      <v-currency-field
                        label="Quantidade"
                        v-model="object.qty"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              @click="hide()"
              icon
              fab
              :loading="
                loading[LOADING_IDENTIFIER] ||
                loading[LOADING_IDENTIFIER_SEARCH_PRODUCTS]
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              color="success"
              submit
              icon
              fab
              @click="handleSubmit(save)"
              :loading="
                loading[LOADING_IDENTIFIER] ||
                loading[LOADING_IDENTIFIER_SEARCH_PRODUCTS]
              "
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>
</template>

<script>
import combosActions from "@/actions/combosActions";
import productsActions from "@/actions/productsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";

export default {
  props: ["showAdd"],
  data() {
    return {
      minLength: 3,
      visible: false,
      source: "",
      object: {
        idProduct: "",
        qty: "",
      },
      LOADING_IDENTIFIER: "addComboProduct",
      LOADING_IDENTIFIER_SEARCH_PRODUCTS: "searchProductsAsync",
    };
  },
  methods: {
    ...mapMutations(productsConstants.MODULE_NAME, [
      productsConstants.MUTATION_CLEAR_PRODUCTS,
    ]),
    hide() {
      this.$refs.form.reset();
      this.$emit("fechar");
      this.visible = false;
      this.object = { active: true };
    },
    show() {
      this.visible = true;
    },
    save() {
      let id = this.$route.params.id;
      combosActions
        .addProduct(id, this.object, this.LOADING_IDENTIFIER)
        .then((res) => {
          if (res) {
            this.hide();
          }
        });
    },
    searchProducts(term) {
      if ((term || "").length < this.minLength) {
        this[productsConstants.MUTATION_CLEAR_PRODUCTS]();
        return;
      }

      productsActions.search(
        this.source,
        { name: term },
        null,
        null,
        this.LOADING_IDENTIFIER_SEARCH_PRODUCTS
      );
    },
    selectProduct(val) {
      this.object.idProduct = val ? val.id : null;
    },
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
    ...mapState(productsConstants.MODULE_NAME, ["products"]),
  },
  watch: {
    showAdd() {
      if (this.showAdd && !this.visible) this.show();
      else if (!this.showAdd && this.visible) this.hide();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>