<template>
  <validation-observer ref="form" v-slot="{ handleSubmit }">
    <v-card
      :loading="isLoading || loading[LOADING_IDENTIFIER]"
      :disabled="isLoading || loading[LOADING_IDENTIFIER]"
    >
      <v-card-title>
        <span class="overline">{{ $t(COMBO.CARD_INFO.NAME) }}</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="8">
              <validation-provider rules="required|max:64" v-slot="{ errors }">
                <v-text-field
                  :label="$t(COMBO.CARD_INFO.LABELS.NAME)"
                  required
                  v-model="item.name"
                  :error-messages="errors"
                  counter="64"
                  :readonly="!isEdit"
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="4">
              <validation-provider
                rules="required|greater_than:0"
                v-slot="{ errors }"
              >
                <v-currency-field
                  :label="$t(COMBO.CARD_INFO.LABELS.PRICE)"
                  v-model="item.price"
                  :error-messages="errors"
                  :readonly="!isEdit"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row align="start">
            <v-col cols="4">
              <validation-provider v-slot="{ errors }">
                <v-currency-field
                  :label="$t(COMBO.CARD_INFO.LABELS.PROMOTIONAL_PRICE)"
                  v-model="item.promotionalPrice"
                  :error-messages="errors"
                  :readonly="true"
                  :disabled="true"
                />
              </validation-provider>
            </v-col>
            <v-col cols="4">
              <common-date-picker
                :date="item.endSale"
                :readonly="true"
                :disabled="true"
                :label="$t(COMBO.CARD_INFO.LABELS.END_SALE)"
                @changeDate="changeDate"
              />
            </v-col>
            <v-col cols="4">
              <validation-provider v-slot="{ errors }">
                <v-checkbox
                  v-model="item.onSale"
                  :label="$t(COMBO.CARD_INFO.LABELS.ON_SALE)"
                  color="primary"
                  hide-details
                  :error-messages="errors"
                  :readonly="true"
                  :disabled="true"
                ></v-checkbox>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <validation-provider rules="max:512" v-slot="{ errors }">
                <v-textarea
                  :label="$t(COMBO.CARD_INFO.LABELS.COMMENTS)"
                  v-model="item.comments"
                  :error-messages="errors"
                  counter="512"
                  :readonly="!isEdit"
                ></v-textarea>
              </validation-provider>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions v-if="showActions">
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="cancel()"
          icon
          fab
          :loading="isLoading || loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-cancel</v-icon>
        </v-btn>
        <v-btn
          color="success"
          submit
          icon
          fab
          :disabled="!isEdit"
          @click="handleSubmit(onSave)"
          :loading="isLoading || loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <common-confirm-dialog
      :showDialog="showDialog"
      :title="$t(COMBO.CARD_INFO.MESSAGES.CONFIRM_UPDATE.TITLE)"
      :message="$t(COMBO.CARD_INFO.MESSAGES.CONFIRM_UPDATE.MESSAGE)"
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
          :disabled="!isEdit"
          @click="save()"
          :loading="isLoading || loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </common-confirm-dialog>
  </validation-observer>
</template>

<script>
import combosActions from "@/actions/combosActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["object", "isEdit", "isLoading", "showActions"],
  data() {
    return {
      showDialog: false,
      menu: false,
      LOADING_IDENTIFIER: "editCombo",
      item: {},
    };
  },
  methods: {
    cancel() {
      this.$refs.form.reset();
      this.item = { ...this.object };
    },
    onSave() {
      this.showDialog = true;
    },
    save() {
      let id = this.$route.params.id;
      combosActions.edit(id, this.item, this.LOADING_IDENTIFIER);
      this.showDialog = false;
    },
    changeDate(date) {
      this.item.endSale = date;
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    object() {
      this.item = { ...this.object };
    },
  },
  created() {
    this.COMBO = i18nConstants.COMBO;
  },
};
</script>