<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="900px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card :loading="loading[LOADING_IDENTIFIER]">
          <v-card-title>
            <span class="headline">Adicionar Cliente</span>
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
                        v-model="object.name"
                        :error-messages="errors"
                        counter="64"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row justify="space-between">
                  <v-col cols="8">
                    <validation-provider rules="max:32" v-slot="{ errors }">
                      <v-text-field
                        label="Apelido"
                        v-model="object.nickname"
                        :error-messages="errors"
                        counter="32"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="4" class="d-flex justify-end">
                    <validation-provider
                      rules="required|max:64"
                      v-slot="{ errors }"
                    >
                      <v-radio-group
                        v-model="object.sex"
                        row
                        :error-messages="errors"
                      >
                        <v-radio label="M" value="m"></v-radio>
                        <v-radio label="F" value="f" class="mr-0"></v-radio>
                      </v-radio-group>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8">
                    <validation-provider
                      rules="max:128|email"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        name="email"
                        label="E-mail"
                        v-model="object.email"
                        :error-messages="errors"
                        counter="128"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="4">
                    <common-date-picker
                      :date="object.birthday"
                      label="Dt Nascimento"
                      @changeDate="changeDate"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <validation-provider
                      rules="min:14"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Telefone"
                        v-model="object.phone"
                        :error-messages="errors"
                        v-mask="'(##) #?####-####'"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="4">
                    <validation-provider
                      rules="min:14"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Celular"
                        v-model="object.cellPhone"
                        :error-messages="errors"
                        v-mask="'(##) #?####-####'"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="4">
                    <validation-provider rules="max:64" v-slot="{ errors }">
                      <v-text-field
                        label="Profissão"
                        v-model="object.occupation"
                        :error-messages="errors"
                        counter="64"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="9">
                    <validation-provider
                      rules="required|max:64"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Endereço"
                        v-model="object.address.street"
                        :error-messages="errors"
                        counter="64"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="3">
                    <validation-provider rules="max:10" v-slot="{ errors }">
                      <v-text-field
                        label="Número"
                        v-model="object.address.number"
                        :error-messages="errors"
                        counter="10"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <validation-provider
                      rules="required|max:64"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="Bairro"
                        v-model="object.address.district"
                        :error-messages="errors"
                        counter="64"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                  <v-col cols="4">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-autocomplete
                        clearable
                        label="Cidade"
                        v-model="object.address.idCity"
                        :error-messages="errors"
                        :items="cities"
                        item-text="name"
                        item-value="id"
                        :loading="loading[LOADING_IDENTIFIER_CITIES]"
                        hide-no-data
                        hide-selected
                      ></v-autocomplete>
                    </validation-provider>
                  </v-col>
                  <v-col cols="4">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <v-autocomplete
                        clearable
                        label="Estado"
                        v-model="object.address.idCountry"
                        :error-messages="errors"
                        :items="countries"
                        item-text="name"
                        item-value="id"
                        :loading="loading[LOADING_IDENTIFIER_COUNTRIES]"
                        hide-no-data
                        hide-selected
                      ></v-autocomplete>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <validation-provider rules="max:512" v-slot="{ errors }">
                      <v-text-field
                        label="Complemento"
                        v-model="object.address.complement"
                        :error-messages="errors"
                        counter="512"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
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
              color="success"
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
import clientsActions from "@/actions/clientsActions";
import addressActions from "@/actions/addressActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import addressConstants from "@/store/modules/address/constants";
import { CLIENTS_EDIT } from "@/router/routes";

export default {
  props: ["showAdd"],
  data() {
    return {
      visible: false,
      menu: false,
      showDialog: false,
      source: "",
      object: {
        name: "",
        sex: "f",
        address: {},
      },
      defObject: {
        name: "",
        sex: "f",
        address: {},
      },
      LOADING_IDENTIFIER: "addClient",
      LOADING_IDENTIFIER_COUNTRIES: "searchCountries",
      LOADING_IDENTIFIER_CITIES: "searchCities",
    };
  },
  methods: {
    ...mapMutations(addressConstants.MODULE_NAME, [
      addressConstants.MUTATION_CLEAR_CITIES,
      addressConstants.MUTATION_CLEAR_COUNTRIES,
    ]),
    hide() {
      this.$refs.form.reset();
      this.$emit("fechar");
      this.visible = false;
      this.object = this.defObject;
    },
    show() {
      this.visible = true;
      this.searchCountries();
    },
    save() {
      clientsActions.add(this.object, this.LOADING_IDENTIFIER).then((res) => {
        if (res.success) {
          this.visible = false;
        }
      });
    },
    changeDate(date) {
      this.object.birthday = date;
    },
    searchCountries() {
      addressActions.searchCountries(
        this.source,
        this.LOADING_IDENTIFIER_COUNTRIES
      );
    },
    searchCities() {
      let idCountry = this.object.address.idCountry;
      if (idCountry) {
        addressActions.searchCities(
          idCountry,
          this.source,
          this.LOADING_IDENTIFIER_CITIES
        );
      } else {
        this[addressConstants.MUTATION_CLEAR_CITIES]();
      }
    },
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
    ...mapState(addressConstants.MODULE_NAME, ["countries", "cities"]),
  },
  watch: {
    showAdd() {
      if (this.showAdd && !this.visible) this.show();
      else if (!this.showAdd && this.visible) this.hide();
    },
    "object.address.idCountry"() {
      this.searchCities();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>