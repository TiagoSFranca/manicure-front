<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <v-card :loading="loading" :disabled="disabled">
        <v-card-title>
          <span class="headline">
            {{ $t(SCHEDULE.ADD.VERIFY_STOCK.ERROR.NAME) }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-row v-if="(stockErrors.combos || []).length > 0">
            <v-col>
              <card-combos :combos="stockErrors.combos" />
            </v-col>
          </v-row>
          <v-row v-if="(stockErrors.products || []).length > 0">
            <v-col>
              <card-products :products="stockErrors.products" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="hide()" icon fab :loading="loading">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
            color="success"
            submit
            icon
            fab
            @click="onSave"
            :loading="loading"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <common-confirm-dialog
      :showDialog="showDialog"
      :title="$t(SCHEDULE.ADD.VERIFY_STOCK.ERROR.MESSAGES.CONFIRM_ADD.TITLE)"
      :message="
        $t(SCHEDULE.ADD.VERIFY_STOCK.ERROR.MESSAGES.CONFIRM_ADD.MESSAGE)
      "
      @close="showDialog = false"
    >
      <template slot="actions">
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancel()" icon fab>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn color="success" submit icon fab @click="save()">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </common-confirm-dialog>
  </v-row>
</template>

<script>
import CardProducts from "./CardProducts.vue";
import CardCombos from "./CardCombos.vue";
import i18nConstants from "@/i18n/constants";

export default {
  components: { CardProducts, CardCombos },
  props: ["showError", "stockErrors", "loading", "disabled"],
  data() {
    return {
      visible: false,
      showDialog: false,
    };
  },
  methods: {
    hide() {
      this.$emit("fechar");
      this.visible = false;
    },
    show() {
      this.visible = true;
    },
    save() {
      this.showDialog = false;
      this.$emit("confirm");
    },
    cancel() {
      this.showDialog = false;
    },
    onSave() {
      this.showDialog = true;
    },
  },
  watch: {
    showError() {
      if (this.showError && !this.visible) this.show();
      else if (!this.showError && this.visible) this.hide();
    },
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>