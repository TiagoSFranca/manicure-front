<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        {{ isOpen(open) }}
        <span v-if="open" key="0"></span>
        <span v-else key="1" class="overline text-truncate">
          {{ product.product.name }}
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card-title>
          <span class="overline text-justify"> {{ product.product.name }}</span>
          <v-spacer></v-spacer>
          <v-tooltip bottom v-if="product.product.onSale">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="warning" v-bind="attrs" v-on="on">
                mdi-sale
              </v-icon>
            </template>
            <span>{{ $t(GENERAL.LABELS.ON_SALE) }}</span>
          </v-tooltip>
        </v-card-title>
        <div v-if="!isEdit">
          <v-card-text>
            <v-row align="center" justify="space-between">
              <v-col cols="12" class="text-left">
                <span class="overline">
                  {{ $t(COMBO.PRODUCT_ITEM.LABELS.QTY) }}:
                </span>
                <span class="ml-2 caption">{{ product.qty }}</span>
              </v-col>
              <v-col cols="12" class="text-left pt-0">
                <span class="overline">
                  {{ $t(COMBO.PRODUCT_ITEM.LABELS.PRICE) }}:</span
                >
                <span class="ml-2 caption">{{
                  toCurrency(
                    product.product.onSale
                      ? product.product.promotionalPrice
                      : product.product.price
                  )
                }}</span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions v-if="showActions">
            <v-spacer></v-spacer>
            <v-btn dark icon color="accent" @click="onEdit">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn dark icon color="error" @click="onShowDialog()">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
        <div v-else>
          <validation-observer ref="form" v-slot="{ handleSubmit }">
            <v-card-text>
              <v-form>
                <v-row class="py-0">
                  <v-col cols="12" class="py-0">
                    <validation-provider
                      rules="required|greater_than:0"
                      v-slot="{ errors }"
                    >
                      <v-currency-field
                        :label="$t(COMBO.PRODUCT_ITEM.LABELS.QTY)"
                        v-model="object.qty"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions v-if="showActions">
              <v-spacer></v-spacer>
              <v-btn dark icon color="error" @click="isEdit = false">
                <v-icon>mdi-cancel</v-icon>
              </v-btn>
              <v-btn
                dark
                icon
                color="success"
                @click="handleSubmit(() => onShowDialog(true))"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </div>
        <v-card-actions v-if="!showActions">
          <v-spacer></v-spacer>
          <v-btn dark icon @click="seeProduct(product.product)">
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>

      <common-confirm-dialog
        :showDialog="showDialog"
        :title="title"
        :message="message"
        @close="showDialog = false"
      >
        <template slot="actions">
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="showDialog = false"
            icon
            fab
            :loading="isLoading || loading[LOADING_IDENTIFIER]"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
            color="success"
            submit
            icon
            fab
            @click="confirmDialog()"
            :loading="isLoading || loading[LOADING_IDENTIFIER]"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
      </common-confirm-dialog>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import combosActions from "@/actions/combosActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { ToCurrency } from "@/utils/methods";
import { PRODUCTS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["product", "showActions"],
  data() {
    return {
      showAdd: false,
      isEdit: false,
      showDialog: false,
      isLoading: false,
      LOADING_IDENTIFIER: "updateOrDeleteComboProduct",
      message: "",
      title: "",
      object: {
        qty: null,
      },
    };
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  methods: {
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    onEdit() {
      this.isEdit = true;
      this.object = { ...this.product };
    },
    onShowDialog(isEdit = false) {
      this.showDialog = true;

      var item = !isEdit
        ? this.COMBO.PRODUCT_ITEM.MESSAGES.CONFIRM_DELETE
        : this.COMBO.PRODUCT_ITEM.MESSAGES.CONFIRM_UPDATE;

      this.message = this.$t(item.MESSAGE);
      this.title = this.$t(item.TITLE);
    },
    edit(id) {
      combosActions.editProduct(
        id,
        this.product.id,
        this.object,
        this.LOADING_IDENTIFIER
      );
      this.showDialog = false;
      this.isEdit = false;
    },
    delete(id) {
      combosActions.deleteProduct(id, this.product.id, this.LOADING_IDENTIFIER);
      this.showDialog = false;
    },
    confirmDialog() {
      let id = this.$route.params.id;
      this.isEdit ? this.edit(id) : this.delete(id);
    },
    isOpen(open) {
      if (!open) this.isEdit = false;
    },
    seeProduct(combo) {
      let routeData = this.$router.resolve({
        path: PRODUCTS_DETAILS.replace(":id", combo.id),
      });
      window.open(routeData.href, "_blank");
    },
  },
  created() {
    this.COMBO = i18nConstants.COMBO;
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>