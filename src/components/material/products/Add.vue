<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">Adicionar Produto</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nome"
                    required
                    v-model="object.name"
                    :rules="nameRules"
                    counter="64"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="4">
                  <v-currency-field
                    label="Valor original"
                    required
                    v-model="object.originalValue"
                    :rules="originalValueRules"
                  />
                </v-col>
                <v-col cols="4">
                  <v-currency-field
                    label="Valor promocional"
                    required
                    v-model="object.saleValue"
                    :rules="saleValueRules"
                  />
                </v-col>
                <v-col cols="4">
                  <v-checkbox
                    v-model="object.onSale"
                    label="Em promoção"
                    color="primary"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row align="start">
                <v-col cols="4">
                  <v-checkbox v-model="object.active" label="Ativo" color="primary" hide-details></v-checkbox>
                </v-col>
                <v-col cols="4"></v-col>
                <v-col cols="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="object.endSale"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                    :disabled="!object.onSale"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="object.endSale"
                        label="Fim da promoção"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        :disabled="!object.onSale"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="object.endSale" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn color="error" @click="menu = false" icon fab small>
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-btn color="accent" @click="$refs.menu.save(object.endSale)" icon fab small>
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    label="Comentário"
                    v-model="object.comments"
                    :rules="commentsRules"
                    counter="512"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="hide()" icon fab>
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn color="primary" submit @click="save()" icon fab>
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import generoPetService from "@/services/generoPet";
import petService from "@/services/pets";
import axiosSourceToken from "@/utils/axiosSourceToken";
import rules from "@/utils/rules";
import { mapState } from "vuex";

export default {
  props: ["showAdd"],
  data() {
    return {
      imagem: null,
      visible: false,
      valid: true,
      menu: false,
      source: "",
      object: {
        name: "",
        originalValue: null,
        saleValue: null,
        onSale: false,
        active: false,
        endSale: "",
        comments: "",
      },
      nameRules: [rules.required("Nome"), rules.maxLength(64)],
      originalValueRules: [
        rules.required("Valor original"),
        rules.greaterThan(0)
      ],
      saleValueRules: [
        rules.required("Valor promocional"),
        rules.greaterThan(0)
      ],
      commentsRules: [rules.maxLength(512)],
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
      if (this.$refs.form.validate()) {
        console.log("THIS OBJECT", this.object);
        // this.object.imagem = this.imagem;
        // petService.adicionar(this.object).then(res => {
        //   if (res) {
        //     this.hide();
        //   }
        // });
      }
    }
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
    // generoPetService.get(this.source);
  },
  computed: {
    ...mapState("generoPet", ["generos"])
  },
  watch: {
    showAdd() {
      if (this.showAdd && !this.visible) this.show();
      else if (!this.showAdd && this.visible) this.hide();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  }
};
</script>