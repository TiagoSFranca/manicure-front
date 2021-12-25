<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card :disabled="loading[LOADING_IDENTIFIER]">
          <v-card-title>
            <span class="headline">{{ $t(getTitle()) }}</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row v-if="type !== SALE_STATUS.END">
                <v-col cols="4" v-if="type === SALE_STATUS.START">
                  <validation-provider
                    :rules="`required|greater_than:0|lower_than_other:${price},'${$t(
                      COMBO.CHANGE_SALE.LABELS.PRICE
                    )}'`"
                    v-slot="{ errors }"
                  >
                    <v-currency-field
                      :label="$t(COMBO.CHANGE_SALE.LABELS.PROMOTIONAL_PRICE)"
                      v-model="object.price"
                      :error-messages="errors"
                    />
                  </validation-provider>
                </v-col>
                <v-col cols="6">
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    ref="providerDate"
                  >
                    <common-date-picker
                      :date="object.date"
                      :label="$t(COMBO.CHANGE_SALE.LABELS.END_SALE)"
                      @changeDate="changeDate"
                      :errors="errors"
                      :min="minDate"
                      :max="maxDate"
                      v-model="object.date"
                      @blur="$refs.providerDate.validate()"
                      @change="$refs.providerDate.validate()"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col
                  ><span class="overline">{{
                    $t(COMBO.CHANGE_SALE.MESSAGES.CONFIRM_END)
                  }}</span></v-col
                >
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
  </v-row>
</template>

<script>
import combosActions from "@/actions/combosActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import i18nConstants from "@/i18n/constants";
import { SALE_STATUS } from "@/utils/constants";

export default {
  props: ["showChangeSale", "type", "price", "idCombo", "date"],
  data() {
    return {
      visible: false,
      menu: false,
      showDialog: false,
      object: {
        price: null,
        date: null,
      },
      defObject: {
        price: null,
        date: null,
      },
      LOADING_IDENTIFIER: "changeComboSale",
      minDate: new Date().toISOString(),
      maxDate: "",
    };
  },
  methods: {
    hide() {
      this.$refs.form.reset();
      this.$emit("close");
      this.visible = false;
      this.object = this.defObject;
      this.minDate = new Date().toISOString();
      this.maxDate = "";
    },
    show() {
      this.visible = true;
    },
    save() {
      combosActions
        .changeSale(
          this.idCombo,
          { ...this.object, idSaleStatus: this.type },
          this.LOADING_IDENTIFIER
        )
        .then((res) => {
          if (res) {
            this.hide();
          }
        });
    },
    changeDate(date) {
      this.object.date = date;
    },
    getTitle() {
      switch (this.type) {
        case SALE_STATUS.START:
          return this.COMBO.CHANGE_SALE.START_NAME;
        case SALE_STATUS.END:
          return this.COMBO.CHANGE_SALE.END_NAME;
        case SALE_STATUS.ANTECIPATE:
          return this.COMBO.CHANGE_SALE.ANTECIPATE_NAME;
        case SALE_STATUS.EXTEND:
          return this.COMBO.CHANGE_SALE.EXTEND_NAME;
      }
    },
    setDate() {
      if (this.type === SALE_STATUS.EXTEND) {
        this.minDate = this.date;
        this.object.date = this.date;
      } else if (this.type === SALE_STATUS.ANTECIPATE) {
        this.maxDate = this.date;
        this.object.date = this.date;
        this.minDate = new Date().toISOString();
      }
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    showChangeSale() {
      if (this.showChangeSale && !this.visible) this.show();
      else if (!this.showChangeSale && this.visible) this.hide();
    },
    date() {
      this.setDate();
    },
    type() {
      this.setDate();
    },
  },
  created() {
    this.COMBO = i18nConstants.COMBO;
    this.SALE_STATUS = SALE_STATUS;
  },
};
</script>