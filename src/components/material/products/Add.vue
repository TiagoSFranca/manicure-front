<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card :disabled="loading[LOADING_IDENTIFIER]">
          <v-card-title>
            <span class="headline">{{ $t(PRODUCT.ADD.NAME) }}</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <validation-provider
                    rules="required|max:64"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      :label="$t(PRODUCT.ADD.LABELS.NAME)"
                      required
                      v-model="object.name"
                      :error-messages="errors"
                      counter="64"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="4">
                  <validation-provider
                    rules="required|greater_than:0"
                    v-slot="{ errors }"
                  >
                    <v-currency-field
                      :label="$t(PRODUCT.ADD.LABELS.PRICE)"
                      v-model="object.price"
                      :error-messages="errors"
                    />
                  </validation-provider>
                </v-col>
                <v-col cols="4">
                  <validation-provider
                    :rules="`${
                      object.onSale ? 'required|' : ''
                    }greater_than:0|lower_than_other:${object.price},'${$t(
                      PRODUCT.ADD.LABELS.PRICE
                    )}'`"
                    v-slot="{ errors }"
                  >
                    <v-currency-field
                      :label="$t(PRODUCT.ADD.LABELS.PROMOTIONAL_PRICE)"
                      v-model="object.promotionalPrice"
                      :error-messages="errors"
                    />
                  </validation-provider>
                </v-col>
                <v-col cols="4">
                  <validation-provider v-slot="{ errors }">
                    <v-checkbox
                      v-model="object.onSale"
                      :label="$t(PRODUCT.ADD.LABELS.ON_SALE)"
                      color="primary"
                      hide-details
                      :error-messages="errors"
                    ></v-checkbox>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="4">
                  <validation-provider v-slot="{ errors }">
                    <v-checkbox
                      v-model="object.active"
                      :label="$t(PRODUCT.ADD.LABELS.ACTIVE)"
                      color="primary"
                      hide-details
                      :error-messages="errors"
                    ></v-checkbox>
                  </validation-provider>
                </v-col>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                  <common-date-picker
                    :date="object.endSale"
                    :disabled="!object.onSale"
                    :label="$t(PRODUCT.ADD.LABELS.END_SALE)"
                    @changeDate="changeDate"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <validation-provider rules="max:512" v-slot="{ errors }">
                    <v-textarea
                      :label="$t(PRODUCT.ADD.LABELS.COMMENTS)"
                      v-model="object.comments"
                      :error-messages="errors"
                      counter="512"
                    ></v-textarea>
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
      </validation-observer>
    </v-dialog>
    <common-confirm-dialog
      :showDialog="showDialog"
      :title="$t(PRODUCT.ADD.MESSAGES.REDIRECT_TO_EDIT.TITLE)"
      :message="$t(PRODUCT.ADD.MESSAGES.REDIRECT_TO_EDIT.MESSAGE)"
      @close="showDialog = false"
    >
      <template slot="actions">
        <v-spacer></v-spacer>
        <v-btn color="error" @click="() => redirect(false)" icon fab>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn color="success" icon fab @click="() => redirect(true)">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </common-confirm-dialog>
  </v-row>
</template>

<script>
import productsActions from "@/actions/productsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { PRODUCTS_EDIT } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["showAdd"],
  data() {
    return {
      visible: false,
      menu: false,
      showDialog: false,
      source: "",
      object: {
        name: "",
        price: "",
        promotionalPrice: null,
        onSale: false,
        active: true,
        endSale: null,
        comments: "",
      },
      LOADING_IDENTIFIER: "addProduct",
      idProduct: "",
    };
  },
  methods: {
    hide() {
      this.$refs.form.reset();
      this.$emit("fechar");
      this.visible = false;
      this.showDialog = false;
      this.object = { active: true };
    },
    show() {
      this.visible = true;
    },
    save() {
      productsActions.add(this.object, this.LOADING_IDENTIFIER).then((res) => {
        if (res.success) {
          this.showDialog = true;
          this.visible = false;
          this.idProduct = res.id;
        }
      });
    },
    changeDate(date) {
      this.object.endSale = date;
    },
    redirect(toEdit) {
      this.hide();
      if (toEdit) {
        this.$router.push({
          path: PRODUCTS_EDIT.replace(":id", this.idProduct),
        });
      }
    },
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
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
  created() {
    this.PRODUCT = i18nConstants.PRODUCT;
  },
};
</script>