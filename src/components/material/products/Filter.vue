<template>
  <v-overlay :value="showFilter" z-index="200">
    <v-bottom-sheet :value="showFilter" hide-overlay persistent>
      <v-sheet class="text-center">
        <v-row>
          <v-col>
            <div class="title">Filtrar Produtos</div>
          </v-col>
        </v-row>
        <v-form ref="form" lazy-validation @submit.prevent="submit">
          <v-container>
            <v-row align="start" justify="center">
              <v-col cols="12" md="3">
                <v-text-field v-model="filter.name" label="Nome"></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <common-date-picker
                  :date="filter.beginEndSale"
                  label="Fim da Promoção - Início"
                  @changeDate="(date) => changeDate(date, true)"
                />
              </v-col>

              <v-col cols="12" md="3">
                <common-date-picker
                  :date="filter.endEndSale"
                  label="Fim da Promoção - Fim"
                  @changeDate="(date) => changeDate(date, false)"
                />
              </v-col>

              <v-col cols="auto">
                <v-radio-group v-model="filter.active" label="Ativo">
                  <v-radio label="Todos" :value="NOT_SELECTED"></v-radio>
                  <v-radio label="Sim" value="true"></v-radio>
                  <v-radio label="Não" value="false"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="auto">
                <v-radio-group v-model="filter.onSale" label="Em Promoção">
                  <v-radio label="Todos" :value="NOT_SELECTED"></v-radio>
                  <v-radio label="Sim" value="true"></v-radio>
                  <v-radio label="Não" value="false"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-row>
          <v-col>
            <v-btn
              class="mx-6"
              color="error"
              @click="fecharFiltro()"
              icon
              fab
              small
            >
              <v-icon>mdi-close</v-icon></v-btn
            >
            <v-btn
              class="mx-6"
              color="accent"
              @click="limparFiltro()"
              icon
              fab
              small
              :loading="loading"
              ><v-icon>mdi-delete-empty-outline</v-icon></v-btn
            >
            <v-btn
              class="mx-6"
              color="success"
              @click="onFilter()"
              icon
              fab
              large
              :loading="loading"
              ><v-icon>mdi-magnify</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </v-overlay>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import productsConstants from "@/store/modules/products/constants";

const NOT_SELECTED = "NONE";

export default {
  props: ["loading", "filtered"],
  data() {
    return {
      page: 1,
      filter: {
        name: "",
        active: NOT_SELECTED,
        onSale: NOT_SELECTED,
        beginEndSale: "",
        endEndSale: "",
      },
      NOT_SELECTED: NOT_SELECTED,
      source: "",
    };
  },
  computed: {
    ...mapState(productsConstants.MODULE_NAME, ["showFilter"]),
  },
  watch: {
    showFilter(val) {
      if (val === true) {
        if (this.filtered.onSale == undefined) {
          this.filtered.onSale = NOT_SELECTED;
        }

        if (this.filtered.active == undefined) {
          this.filtered.active = NOT_SELECTED;
        }

        this.filter = { ...this.filtered };
      } else {
        this.limparFiltro();
      }
    },
  },
  methods: {
    ...mapMutations(productsConstants.MODULE_NAME, [
      productsConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    fecharFiltro() {
      this[productsConstants.MUTATION_SET_SHOW_FILTER](false);
    },
    limparFiltro() {
      this.$refs.form.reset();
      this.filter = {
        active: NOT_SELECTED,
        onSale: NOT_SELECTED,
      };
    },
    onFilter() {
      this.$emit("onFilter", {
        ...this.filter,
        active: this.filter.active === NOT_SELECTED ? "" : this.filter.active,
        onSale: this.filter.onSale === NOT_SELECTED ? "" : this.filter.onSale,
      });
    },
    changeDate(date, begin) {
      if (begin) this.filter.beginEndSale = date;
      else this.filter.endEndSale = date;
    },
  },
};
</script>