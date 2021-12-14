<template>
  <v-overlay :value="showFilter" z-index="200">
    <v-bottom-sheet :value="showFilter" hide-overlay persistent>
      <v-sheet class="text-center">
        <v-row>
          <v-col>
            <div class="title">{{ $t(MATERIAL.FILTER.WARNING_STOCK_NAME) }}</div>
          </v-col>
        </v-row>
        <v-form ref="form" lazy-validation @submit.prevent="submit">
          <v-row align="center" justify="center">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filter.name"
                :label="$t(MATERIAL.FILTER.LABELS.NAME)"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-radio-group
                v-model="filter.active"
                :label="$t(MATERIAL.FILTER.LABELS.ACTIVE)"
              >
                <v-radio
                  :label="$t(MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.ALL)"
                  :value="NOT_SELECTED"
                ></v-radio>
                <v-radio
                  :label="$t(MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.YES)"
                  :value="true"
                ></v-radio>
                <v-radio
                  :label="$t(MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.NOT)"
                  :value="false"
                ></v-radio>
              </v-radio-group>
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

const NOT_SELECTED = "NONE";

export default {
  props: ["loading", "filtered"],
  data() {
    return {
      page: 1,
      filter: {
        name: "",
        active: true,
      },
      source: "",
      NOT_SELECTED: NOT_SELECTED,
    };
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, ["showFilter"]),
  },
  watch: {
    showFilter(val) {
      if (val === true) {
        if (this.filtered.active == undefined) {
          this.filtered.active = NOT_SELECTED;
        }
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
      this.filter = { active: true };
    },
    onFilter() {
      this.$emit("onFilter", {
        ...this.filter,
        active: this.filter.active === NOT_SELECTED ? "" : this.filter.active,
      });
    },
  },
  created() {
    this.MATERIAL = i18nConstants.MATERIAL;
  },
};
</script>