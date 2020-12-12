<template>
  <v-overlay :value="showFilter" z-index="200">
    <v-bottom-sheet :value="showFilter" hide-overlay persistent>
      <v-sheet class="text-center">
        <v-row>
          <v-col>
            <div class="title">{{ $t(MATERIAL.FILTER.NAME) }}</div>
          </v-col>
        </v-row>
        <v-form ref="form" lazy-validation @submit.prevent="submit">
          <v-row align="start" justify="center">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filter.name"
                :label="$t(MATERIAL.FILTER.LABELS.NAME)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col>
            <v-btn
              class="mx-6"
              color="error"
              @click="closeFilter()"
              icon
              fab
              small
            >
              <v-icon>mdi-close</v-icon></v-btn
            >
            <v-btn
              class="mx-6"
              color="accent"
              @click="clearFilter()"
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
import materialsConstants from "@/store/modules/materials/constants";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["loading", "filtered"],
  data() {
    return {
      page: 1,
      filter: {
        name: "",
      },
      source: "",
    };
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, ["showFilter"]),
  },
  watch: {
    showFilter(val) {
      if (val === true) {
        this.filter = { ...this.filtered };
      } else {
        this.clearFilter();
      }
    },
  },
  methods: {
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    closeFilter() {
      this[materialsConstants.MUTATION_SET_SHOW_FILTER](false);
    },
    clearFilter() {
      this.$refs.form.reset();
      this.filter = {};
    },
    onFilter() {
      this.$emit("onFilter", { ...this.filter });
    },
  },
  created() {
    this.MATERIAL = i18nConstants.MATERIAL;
  },
};
</script>