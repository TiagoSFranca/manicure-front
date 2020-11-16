<template>
  <validation-observer ref="form" v-slot="{ handleSubmit }">
    <v-card
      :loading="isLoading || loading[LOADING_IDENTIFIER]"
      :height="height"
    >
      <v-card-title>
        <span class="overline">DADOS GERAIS</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-row>
              <v-col cols="12">
                <validation-provider
                  rules="required|max:64"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="Nome"
                    required
                    v-model="item.name"
                    :error-messages="errors"
                    counter="64"
                    :readonly="!isEdit"
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
                    label="Valor original"
                    v-model="item.originalValue"
                    :error-messages="errors"
                    :readonly="!isEdit"
                  />
                </validation-provider>
              </v-col>
              <v-col cols="4">
                <validation-provider
                  :rules="`${
                    item.onSale ? 'required|' : ''
                  }greater_than:0|lower_than_other:${
                    item.originalValue
                  },'Valor Original'`"
                  v-slot="{ errors }"
                >
                  <v-currency-field
                    label="Valor promocional"
                    v-model="item.saleValue"
                    :error-messages="errors"
                    :readonly="!isEdit"
                  />
                </validation-provider>
              </v-col>
              <v-col cols="4">
                <validation-provider v-slot="{ errors }">
                  <v-checkbox
                    v-model="item.onSale"
                    label="Em promoção"
                    color="primary"
                    hide-details
                    :error-messages="errors"
                    :readonly="!isEdit"
                  ></v-checkbox>
                </validation-provider>
              </v-col>
            </v-row>
            <v-row align="start">
              <v-col cols="4">
                <validation-provider v-slot="{ errors }">
                  <v-checkbox
                    v-model="item.active"
                    label="Ativo"
                    color="primary"
                    hide-details
                    :error-messages="errors"
                    :readonly="!isEdit"
                  ></v-checkbox>
                </validation-provider>
              </v-col>
              <v-col cols="4" class="d-sm-none d-md-flex d-lg-flex"></v-col>
              <v-col cols="4" sm="8" md="4" lg="4">
                <common-date-picker
                  :date="item.endSale"
                  :disabled="!(isEdit && item.onSale)"
                  :readonly="!isEdit"
                  label="Fim da Promoção"
                  @changeDate="changeDate"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <validation-provider rules="max:512" v-slot="{ errors }">
                  <v-textarea
                    label="Comentário"
                    v-model="item.comments"
                    :error-messages="errors"
                    counter="512"
                    :readonly="!isEdit"
                  ></v-textarea>
                </validation-provider>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-divider v-if="showActions"></v-divider>
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
      title="Atenção!"
      message="Tem certeza que deseja atualizar os dados?"
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
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  props: ["object", "isEdit", "isLoading", "showActions", "height"],
  data() {
    return {
      showDialog: false,
      menu: false,
      LOADING_IDENTIFIER: "editProduct",
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
      productsActions.edit(id, this.item, this.LOADING_IDENTIFIER);
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
};
</script>