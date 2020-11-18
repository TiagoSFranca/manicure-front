<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title>
            <span class="headline">Adicionar Material</span>
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
                        label="Preço"
                        v-model="object.price"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="4">
                    <validation-provider
                      rules="required|greater_than:0"
                      v-slot="{ errors }"
                    >
                      <v-currency-field
                        label="Quantidade"
                        v-model="object.qty"
                        :error-messages="errors"
                      />
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
import materialsActions from "@/actions/materialsActions";
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
        price: "",
        qty: "",
      },
      LOADING_IDENTIFIER: "addMaterial",
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
      materialsActions.add(this.object, this.LOADING_IDENTIFIER).then((res) => {
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