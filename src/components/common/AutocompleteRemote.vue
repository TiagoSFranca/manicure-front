<template>
  <v-autocomplete
    clearable
    v-model="model"
    :error-messages="errors"
    :items="items"
    :loading="loading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    :item-text="optionText"
    :item-value="optionValue"
    :label="label"
    :placeholder="placeholder"
    return-object
  ></v-autocomplete>
</template>

<script>
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
  },
};
</script>