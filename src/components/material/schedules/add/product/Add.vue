<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{ $t(SCHEDULE.ADD.PRODUCT_ADD.NAME) }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="9">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <common-autocomplete-remote
                      :loading="loading[LOADING_IDENTIFIER_SEARCH_PRODUCTS]"
                      :items="products"
                      :errors="errors"
                      :label="$t(SCHEDULE.ADD.PRODUCT_ADD.LABELS.PRODUCT)"
                      :placeholder="
                        $t(GENERAL.MESSAGES.DIGIT_MIN_LENGTH_TO_SEARCH, {
                          length: minLength,
                        })
                      "
                      option-text="name"
                      option-value="id"
                      @search="searchProducts"
                      @select="selectProduct"
                      v-model="object.idProduct"
                      ref="autocomplete"
                    />
                  </validation-provider>
                </v-col>
                <v-col cols="3">
                  <validation-provider
                    rules="required|greater_than:0"
                    v-slot="{ errors }"
                  >
                    <v-currency-field
                      :label="$t(SCHEDULE.ADD.PRODUCT_ADD.LABELS.QTY)"
                      v-model="object.qty"
                      :error-messages="errors"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              @click="hide()"
              icon
              fab
              :loading="loading[LOADING_IDENTIFIER_SEARCH_PRODUCTS]"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              color="accent"
              submit
              icon
              fab
              @click="handleSubmit(save)"
              :loading="loading[LOADING_IDENTIFIER_SEARCH_PRODUCTS]"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>
</template>

<script>
import productsActions from "@/actions/productsActions";

import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import productsConstants from "@/store/modules/products/constants";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["showAdd"],
  data() {
    return {
      minLength: 3,
      visible: false,
      object: {
        idProduct: "",
        qty: 1,
      },
      defObject: {
        idProduct: "",
        qty: 1,
      },
      productSelected: {},
      LOADING_IDENTIFIER_SEARCH_PRODUCTS: "searchProductsAsync",
    };
  },
  methods: {
    ...mapMutations(productsConstants.MODULE_NAME, [
      productsConstants.MUTATION_CLEAR_PRODUCTS,
    ]),
    hide() {
      this.$refs.form.reset();
      this.$emit("close");
      this.visible = false;
      this.object = this.defObject;
      this.$refs.autocomplete.clear();
    },
    show() {
      this.visible = true;
    },
    save() {
      this.$emit("addProduct", {
        ...this.object,
        product: this.productSelected,
      });
    },
    searchProducts(term) {
      if ((term || "").length < this.minLength) {
        this[productsConstants.MUTATION_CLEAR_PRODUCTS]();
        return;
      }

      productsActions.search(
        { name: term, active: true },
        null,
        null,
        this.LOADING_IDENTIFIER_SEARCH_PRODUCTS
      );
    },
    selectProduct(val) {
      this.object.idProduct = val ? val.id : null;
      this.productSelected = val;
    },
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
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>