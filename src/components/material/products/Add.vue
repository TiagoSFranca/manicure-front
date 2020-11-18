<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title>
            <span class="headline">Adicionar Produto</span>
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
                        label="Valor original"
                        v-model="object.originalValue"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="4">
                    <validation-provider
                      :rules="`${
                        object.onSale ? 'required|' : ''
                      }greater_than:0|lower_than_other:${
                        object.originalValue
                      },'Valor Original'`"
                      v-slot="{ errors }"
                    >
                      <v-currency-field
                        label="Valor promocional"
                        v-model="object.saleValue"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="4">
                    <validation-provider v-slot="{ errors }">
                      <v-checkbox
                        v-model="object.onSale"
                        label="Em promoção"
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
                        label="Ativo"
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
                        v-model="object.comments"
                        :error-messages="errors"
                        counter="512"
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
  props: ["showAdd"],
  data() {
    return {
      visible: false,
      menu: false,
      source: "",
      object: {
        name: "",
        originalValue: "",
        saleValue: null,
        onSale: false,
        active: true,
        endSale: null,
        comments: "",
      },
      LOADING_IDENTIFIER: "addProduct",
    };
  },
  methods: {
    hide() {
      this.$refs.form.reset();
      this.$emit("fechar");
      this.visible = false;
      this.object = { active: true };
    },
    show() {
      this.visible = true;
    },
    save() {
      productsActions.add(this.object, this.LOADING_IDENTIFIER).then((res) => {
        if (res) {
          this.hide();
        }
      });
    },
    changeDate(date) {
      this.object.endSale = date;
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
};
</script>