<template>
  <validation-observer ref="form" v-slot="{ handleSubmit }">
    <v-card
      :loading="isLoading || loading[LOADING_IDENTIFIER]"
      :disabled="isLoading || loading[LOADING_IDENTIFIER]"
    >
      <v-card-title>
        <span class="overline">{{ $t(MATERIAL.CARD_INFO.NAME) }}</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col cols="4">
              <validation-provider rules="required|max:64" v-slot="{ errors }">
                <v-text-field
                  :label="$t(MATERIAL.CARD_INFO.LABELS.NAME)"
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
                  :label="$t(MATERIAL.CARD_INFO.LABELS.PRICE)"
                  v-model="item.price"
                  :error-messages="errors"
                  :readonly="!isEdit"
                />
              </validation-provider>
            </v-col>
            <v-col cols="4">
              <validation-provider
                rules="required|greater_than:0"
                v-slot="{ errors }"
              >
                <v-currency-field
                  :label="$t(MATERIAL.CARD_INFO.LABELS.MIN_QTY)"
                  v-model="item.minQty"
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
                  :label="$t(MATERIAL.CARD_INFO.LABELS.AVALIABLE_QTY)"
                  v-model="item.qty"
                  :error-messages="errors"
                  disabled
                />
              </validation-provider>
            </v-col>
            <v-col cols="4">
              <validation-provider v-slot="{ errors }">
                <v-currency-field
                  :label="$t(MATERIAL.CARD_INFO.LABELS.RESERVED_QTY)"
                  v-model="item.reservedQty"
                  :error-messages="errors"
                  disabled
                />
              </validation-provider>
            </v-col>
            <v-col cols="4">
              <validation-provider v-slot="{ errors }">
                <v-currency-field
                  :label="$t(MATERIAL.CARD_INFO.LABELS.USED_QTY)"
                  v-model="item.usedQty"
                  :error-messages="errors"
                  disabled
                />
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
      :title="$t(MATERIAL.CARD_INFO.MESSAGES.CONFIRM_UPDATE.TITLE)"
      :message="$t(MATERIAL.CARD_INFO.MESSAGES.CONFIRM_UPDATE.MESSAGE)"
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
import materialsActions from "@/actions/materialsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["object", "isEdit", "isLoading", "showActions"],
  data() {
    return {
      showDialog: false,
      menu: false,
      LOADING_IDENTIFIER: "editMaterial",
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
      materialsActions.edit(id, this.item, this.LOADING_IDENTIFIER);
      this.showDialog = false;
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
    this.MATERIAL = i18nConstants.MATERIAL;
  },
};
</script>