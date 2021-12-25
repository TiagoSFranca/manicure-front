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
                <v-col cols="8">
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
        <v-btn color="error" @click="() => hide()" icon fab>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          color="success"
          icon
          fab
          :to="{ name: PRODUCTS_EDIT.name, params: { id: idProduct } }"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </common-confirm-dialog>
  </v-row>
</template>

<script>
import productsActions from "@/actions/productsActions";

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
      object: {
        name: "",
        price: "",
        comments: "",
      },
      defObject: {
        name: "",
        price: "",
        comments: "",
      },
      LOADING_IDENTIFIER: "addProduct",
      idProduct: "",
    };
  },
  methods: {
    hide() {
      this.$refs.form.reset();
      this.$emit("close");
      this.visible = false;
      this.showDialog = false;
      this.object = this.defObject;
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
  created() {
    this.PRODUCT = i18nConstants.PRODUCT;
    this.PRODUCTS_EDIT = PRODUCTS_EDIT;
  },
};
</script>