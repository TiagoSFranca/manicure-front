<template>
  <v-card :loading="isLoading" :disabled="isLoading">
    <v-card-title>
      <span class="overline">{{ $t(CLIENT.CARD_INFO.NAME) }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.NAME)"
              v-model="item.name"
              counter="64"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="8">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.NICKNAME)"
              v-model="item.nickname"
              counter="32"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4" class="d-flex justify-end">
            <v-radio-group v-model="item.sex" row readonly>
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
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-text-field
              name="email"
              :label="$t(CLIENT.EDIT.LABELS.EMAIL)"
              v-model="item.email"
              counter="128"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <common-date-picker
              :date="item.birthday"
              :label="$t(CLIENT.EDIT.LABELS.BIRTHDAY)"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.PHONE)"
              v-model="item.phone"
              v-mask="'(##) #?####-####'"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.CELL_PHONE)"
              v-model="item.cellPhone"
              v-mask="'(##) #?####-####'"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.OCCUPATION)"
              v-model="item.occupation"
              counter="64"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="9">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.ADDRESS.STREET)"
              v-model="item.address.street"
              counter="64"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.ADDRESS.NUMBER)"
              v-model="item.address.number"
              counter="10"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.ADDRESS.DISTRICT)"
              v-model="item.address.district"
              counter="64"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :label="$t(CLIENT.EDIT.LABELS.ADDRESS.COUNTRY)"
              v-model="item.address.city.idCountry"
              :items="[item.address.city.country]"
              item-text="name"
              item-value="id"
              hide-no-data
              hide-selected
              readonly
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :label="$t(CLIENT.EDIT.LABELS.ADDRESS.CITY)"
              v-model="item.address.idCity"
              :items="[item.address.city]"
              item-text="name"
              item-value="id"
              hide-no-data
              hide-selected
              readonly
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              :label="$t(CLIENT.EDIT.LABELS.ADDRESS.COMPLEMENT)"
              v-model="item.address.complement"
              counter="512"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import i18nConstants from "@/i18n/constants";

export default {
  props: ["object", "isLoading"],
  data() {
    return {
      item: {
        address: {
          city: {
            country: {},
          },
        },
      },
    };
  },
  methods: {},
  computed: {},
  watch: {
    object() {
      this.item = { ...this.object };
      this.item.sex = this.item.sex.toLowerCase();
    },
  },
  created() {
    this.CLIENT = i18nConstants.CLIENT;
  },
};
</script>