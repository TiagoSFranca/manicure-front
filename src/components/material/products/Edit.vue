<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title>
            <span class="headline">{{
              `${isEdit ? "Editar" : "Visualizar"} Produto`
            }}</span>
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
                  <v-col cols="4"></v-col>
                  <v-col cols="4">
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
          <v-divider></v-divider>
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
              color="primary"
              submit
              icon
              fab
              :disabled="!isEdit"
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
import productsActions from "@/actions/productsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  props: ["showEdit", "object", "isEdit"],
  data() {
    return {
      imagem: null,
      visible: false,
      menu: false,
      source: "",
      LOADING_IDENTIFIER: "editProduct",
      item: {},
    };
  },
  methods: {
    hide() {
      this.$refs.form.reset();
      this.$emit("fechar");
      this.visible = false;
    },
    show() {
      this.visible = true;
    },
    save() {
      productsActions.edit(this.item, this.LOADING_IDENTIFIER).then((res) => {
        if (res) {
          this.hide();
        }
      });
    },
    changeDate(date) {
      this.item.endSale = date;
    },
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    showEdit() {
      if (this.showEdit && !this.visible) this.show();
      else if (!this.showEdit && this.visible) this.hide();
    },
    object() {
      this.item = { ...this.object };
    },
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>