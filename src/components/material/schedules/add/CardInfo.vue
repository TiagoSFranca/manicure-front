<template>
  <div>
    <form>
      <v-card :disabled="disabled" :loading="isLoading">
        <v-card-title>
          <span class="overline">
            {{ $t(SCHEDULE.ADD.CARD_INFO.NAME) }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-row align="start">
            <v-col cols="4" md="2" lg="2">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                ref="providerDate"
              >
                <common-date-picker
                  :date="object.date"
                  :label="$t(SCHEDULE.ADD.CARD_INFO.LABELS.DATE)"
                  @changeDate="changeDate"
                  :errors="errors"
                  :min="new Date().toJSON()"
                  v-model="object.date"
                  @blur="$refs.providerDate.validate()"
                  @change="$refs.providerDate.validate()"
                />
              </validation-provider>
            </v-col>
            <v-col cols="6" md="8" lg="8">
              <validation-provider
                v-slot="{ errors }"
                rules="required"
                ref="providerAutocomplete"
              >
                <common-autocomplete-remote
                  :loading="loading[LOADING_IDENTIFIER_SEARCH_CLIENTS]"
                  :items="clients"
                  :errors="errors"
                  :label="$t(SCHEDULE.ADD.CARD_INFO.LABELS.CLIENT)"
                  :placeholder="
                    $t(GENERAL.MESSAGES.DIGIT_MIN_LENGTH_TO_SEARCH, {
                      length: minLength,
                    })
                  "
                  option-text="name"
                  option-value="id"
                  @search="searchClients"
                  @select="selectClient"
                  v-model="object.idClient"
                  @blur="$refs.providerAutocomplete.validate()"
                  @change="$refs.providerAutocomplete.validate()"
                >
                  <template v-slot:append-outer>
                    <v-btn icon v-if="object.idClient" @click="seeClient()">
                      <v-icon>mdi-eye-outline</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      color="accent"
                      v-if="!object.idClient"
                      @click="showAdd = true"
                    >
                      <v-icon>mdi-account-plus</v-icon>
                    </v-btn>
                  </template>
                </common-autocomplete-remote>
              </validation-provider>
            </v-col>
            <v-col cols="4" md="2" lg="2">
              <validation-provider v-slot="{ errors }" rules="required">
                <v-checkbox
                  :error-messages="errors"
                  v-model="object.inLoco"
                  :label="$t(SCHEDULE.ADD.CARD_INFO.LABELS.IN_LOCO)"
                />
              </validation-provider>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </form>
    <material-clients-add :showAdd="showAdd" @fechar="showAdd = false" />
  </div>
</template>

<script>
import clientsActions from "@/actions/clientsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import clientsConstants from "@/store/modules/clients/constants";
import { CLIENTS_DETAILS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["isLoading", "disabled"],
  data() {
    return {
      showAdd: false,
      source: "",
      LOADING_IDENTIFIER_SEARCH_CLIENTS: "searchClientsAsync",
      object: { date: "", idClient: "", inLoco: false },
      minLength: 3,
      selected: {},
    };
  },
  methods: {
    ...mapMutations(clientsConstants.MODULE_NAME, [
      clientsConstants.MUTATION_CLEAR_CLIENTS,
    ]),
    searchClients(term) {
      if ((term || "").length < this.minLength) {
        this[clientsConstants.MUTATION_CLEAR_CLIENTS]();
        return;
      }

      clientsActions.search(
        this.source,
        { name: term },
        null,
        null,
        this.LOADING_IDENTIFIER_SEARCH_CLIENTS
      );
    },
    selectClient(val) {
      this.object.idClient = val ? val.id : null;
    },
    changeDate(date) {
      this.object.date = date;
    },
    seeClient() {
      let routeData = this.$router.resolve({
        path: CLIENTS_DETAILS.replace(":id", this.object.idClient),
      });
      window.open(routeData.href, "_blank");
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
    ...mapState(clientsConstants.MODULE_NAME, ["clients"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  watch: {
    object: {
      deep: true,
      handler() {
        this.$emit("changeInfo", this.object);
      },
    },
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>
