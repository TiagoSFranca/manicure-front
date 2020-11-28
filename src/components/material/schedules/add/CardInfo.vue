<template>
  <v-card>
    <v-card-title>
      <span class="overline">Informações GERAIS</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="start" justify="end">
          <v-col cols="4">
            <validation-provider v-slot="{ errors }" rules="required">
              <common-date-picker
                :date="object.date"
                label="Data"
                @changeDate="changeDate"
                :errors="errors"
                v-model="object.date"
              />
            </validation-provider>
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="12">
            <validation-provider v-slot="{ errors }">
              <common-autocomplete-remote
                :loading="loading[LOADING_IDENTIFIER_SEARCH_CLIENTS]"
                :items="clients"
                :errors="errors"
                label="Cliente"
                :placeholder="`Digite ao menos ${minLength} chars para pesquisar`"
                option-text="name"
                option-value="id"
                @search="searchClients"
                @select="selectClient"
                v-model="object.idClient"
              >
                <template v-slot:append-outer>
                  <v-btn icon>
                    <v-icon>mdi-eye-outline</v-icon>
                  </v-btn>
                </template>
              </common-autocomplete-remote>
            </validation-provider>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col cols="12">
            <validation-provider rules="max:512" v-slot="{ errors }">
              <v-textarea
                label="Observações"
                v-model="object.observation"
                :error-messages="errors"
                counter="512"
              ></v-textarea>
            </validation-provider>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import combosActions from "@/actions/combosActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import { COMBOS } from "@/router/routes";

export default {
  data() {
    return {
      showAdd: false,
      source: "",
      LOADING_IDENTIFIER: "searchCombo",
      LOADING_IDENTIFIER_IMAGES: "searchComboImages",
      LOADING_IDENTIFIER_MATERIALS: "searchComboClients",
      object: {},
    };
  },
  methods: {
    // ...mapMutations(clientsConstants.MODULE_NAME, [
    //   clientsConstants.MUTATION_CLEAR_PRODUCTS,
    // ]),
    searchClients(term) {
      if ((term || "").length < this.minLength) {
        this[clientsConstants.MUTATION_CLEAR_PRODUCTS]();
        return;
      }

      clientsActions.search(
        this.source,
        { name: term },
        null,
        null,
        this.LOADING_IDENTIFIER_SEARCH_PRODUCTS
      );
    },
    selectClient(val) {
      this.object.idClient = val ? val.id : null;
    },
    comeBack() {
      this.$router.push({ path: COMBOS });
    },
    changeDate(date) {
      this.object.date = date;
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
    // ...mapState(clientsConstants.MODULE_NAME, ["clients"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
