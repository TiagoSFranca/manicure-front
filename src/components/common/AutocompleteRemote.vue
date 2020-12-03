<template>
  <v-autocomplete
    clearable
    v-model="model"
    :error-messages="errors"
    :items="items"
    :loading="loading"
    :search-input.sync="search"
    hide-selected
    :no-data-text="loading ? 'Procurando...' : 'Nenhum resultado encontrado'"
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
};
</script>