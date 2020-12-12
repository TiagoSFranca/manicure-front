<template>
  <v-autocomplete
    clearable
    v-model="model"
    :error-messages="errors"
    :items="items"
    :loading="loading"
    :search-input.sync="search"
    hide-selected
    :no-data-text="$t(loading ? SEARCHING : DATA_NOT_FOUND)"
    :item-text="optionText"
    :item-value="optionValue"
    :label="label"
    :placeholder="placeholder"
    return-object
    @blur="blur"
    @change="change"
  >
    <template v-slot:append-outer>
      <slot name="append-outer" />
    </template>
  </v-autocomplete>
</template>

<script>
import i18nConstants from "@/i18n/constants";

export default {
  props: [
    "loading",
    "items",
    "selected",
    "errors",
    "optionText",
    "optionValue",
    "label",
    "placeholder",
  ],
  data() {
    return {
      model: "",
      search: "",
    };
  },
  watch: {
    search(val) {
      if (!this.model) this.$emit("search", val);
    },
    model(val) {
      this.$emit("select", val);
    },
  },
  methods: {
    clear() {
      this.model = "";
    },
    blur() {
      this.$emit("blur");
    },
    change() {
      this.$emit("change");
    },
  },
  created() {
    this.SEARCHING = i18nConstants.SEARCHING;
    this.DATA_NOT_FOUND = i18nConstants.DATA_NOT_FOUND;
  },
};
</script>