<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="900px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card :disabled="loading[LOADING_IDENTIFIER]">
          <v-card-title>
            <span class="headline">{{ $t(CLIENT.EDIT.NAME) }}</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <validation-provider
                    rules="required|max:64"
                    v-slot="{ errors }"
                  >
                    <v-text-field
                      :label="$t(CLIENT.EDIT.LABELS.NAME)"
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
                      :label="$t(CLIENT.EDIT.LABELS.NICKNAME)"
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
                      <v-radio
                        :label="$t(CLIENT.EDIT.LABELS.SEX_OPTIONS.MALE)"
                        value="m"
                      ></v-radio>
                      <v-radio
                        :label="$t(CLIENT.EDIT.LABELS.SEX_OPTIONS.FEMALE)"
                        value="f"
                        class="mr-0"
                      ></v-radio>
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
                      :label="$t(CLIENT.EDIT.LABELS.EMAIL)"
                      v-model="object.email"
                      :error-messages="errors"
                      counter="128"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="4">
                  <common-date-picker
                    :date="object.birthday"
                    :label="$t(CLIENT.EDIT.LABELS.BIRTHDAY)"
                    @changeDate="changeDate"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <validation-provider rules="min:14" v-slot="{ errors }">
                    <v-text-field
                      :label="$t(CLIENT.EDIT.LABELS.PHONE)"
                      v-model="object.phone"
                      :error-messages="errors"
                      v-mask="'(##) #?####-####'"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="4">
                  <validation-provider rules="min:14" v-slot="{ errors }">
                    <v-text-field
                      :label="$t(CLIENT.EDIT.LABELS.CELL_PHONE)"
                      v-model="object.cellPhone"
                      :error-messages="errors"
                      v-mask="'(##) #?####-####'"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="4">
                  <validation-provider rules="max:64" v-slot="{ errors }">
                    <v-text-field
                      :label="$t(CLIENT.EDIT.LABELS.OCCUPATION)"
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
                      :label="$t(CLIENT.EDIT.LABELS.ADDRESS.STREET)"
                      v-model="object.address.street"
                      :error-messages="errors"
                      counter="64"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="3">
                  <validation-provider rules="max:10" v-slot="{ errors }">
                    <v-text-field
                      :label="$t(CLIENT.EDIT.LABELS.ADDRESS.NUMBER)"
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
                      :label="$t(CLIENT.EDIT.LABELS.ADDRESS.DISTRICT)"
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
                      :label="$t(CLIENT.EDIT.LABELS.ADDRESS.COUNTRY)"
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
                <v-col cols="4">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <common-autocomplete-remote
                      :loading="loading[LOADING_IDENTIFIER_CITIES]"
                      :items="cities"
                      :errors="errors"
                      :label="$t(CLIENT.EDIT.LABELS.ADDRESS.CITY)"
                      option-text="name"
                      option-value="id"
                      @search="searchCities"
                      @select="selectCities"
                      v-model="object.address.idCity"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <validation-provider rules="max:512" v-slot="{ errors }">
                    <v-text-field
                      :label="$t(CLIENT.EDIT.LABELS.ADDRESS.COMPLEMENT)"
                      v-model="object.address.complement"
                      :error-messages="errors"
                      counter="512"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-form>
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
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import addressConstants from "@/store/modules/address/constants";
import clientsConstants from "@/store/modules/clients/constants";
import i18nConstants from "@/i18n/constants";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["showEdit", "id"],
  data() {
    return {
      visible: false,
      menu: false,
      showDialog: false,
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
      cityName: "",
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
      this.$emit("close");
      this.visible = false;
      this.object = this.defObject;
    },
    show() {
      this.visible = true;
      this.searchCountries();
    },
    save() {
      clientsActions
        .edit(this.id, this.object, this.LOADING_IDENTIFIER)
        .then((res) => {
          if (res) {
            this.hide();
          }
        });
    },
    changeDate(date) {
      this.object.birthday = date;
    },
    searchCountries() {
      addressActions.searchCountries(
        uuidv4(),
        this.LOADING_IDENTIFIER_COUNTRIES
      );
    },
    searchCities(term) {
      let idCountry = this.object.address.idCountry;
      if (!idCountry) {
        this[addressConstants.MUTATION_CLEAR_CITIES]();
        return;
      }

      if (this.prevRequest) {
        axiosSourceToken.cancelToken(this.prevRequest);
        this.prevRequest = "";
      }

      this.prevRequest = uuidv4();

      this.LOADING_IDENTIFIER_CITIES =
        this.LOADING_IDENTIFIER_CITIES + `(${this.prevRequest})`;

      addressActions.searchCities(
        { idCountry: idCountry, name: term },
        uuidv4(),
        this.LOADING_IDENTIFIER_CITIES
      );
    },
    selectCities(val) {
      this.object.address.idCity = val ? val.id : null;
    },
    getClient() {
      clientsActions.get(this.id, uuidv4(), this.LOADING_IDENTIFIER);
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
    ...mapState(addressConstants.MODULE_NAME, ["countries", "cities"]),
    ...mapState(clientsConstants.MODULE_NAME, ["client"]),
  },
  watch: {
    showEdit() {
      if (this.showEdit && !this.visible) this.show();
      else if (!this.showEdit && this.visible) this.hide();
    },
    "object.address.idCountry"() {
      this.searchCities(this.cityName || "");
      this.cityName = ""
    },
    id() {
      if (this.id) {
        this.getClient();
      }
    },
    client() {
      if (this.client) {
        this.object = this.client;
        this.object.address.idCountry = this.client.address.city.idCountry;
        this.cityName = this.client.address.city.name;
        this.object.sex = this.client.sex.toLowerCase();
      }
    },
  },
  created() {
    this.CLIENT = i18nConstants.CLIENT;
  },
};
</script>