<template>
  <v-overlay :value="showFilter" z-index="200">
    <v-bottom-sheet :value="showFilter" hide-overlay persistent>
      <v-sheet class="text-center">
        <v-row>
          <v-col>
            <div class="title">
              {{ $t(COMBO.FILTER.ON_SALE_NAME) }}
            </div>
          </v-col>
        </v-row>
        <v-form ref="form" lazy-validation @submit.prevent="submit">
          <v-row align="start" justify="center">
            <v-col cols="12" md="3">
              <v-text-field
                v-model="filter.name"
                :label="$t(COMBO.FILTER.LABELS.NAME)"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <common-date-picker
                :date="filter.beginEndSale"
                :label="$t(COMBO.FILTER.LABELS.BEGIN_END_SALE)"
                @changeDate="(date) => changeDate(date, true)"
              />
            </v-col>

            <v-col cols="12" md="3">
              <common-date-picker
                :date="filter.endEndSale"
                :label="$t(COMBO.FILTER.LABELS.END_END_SALE)"
                @changeDate="(date) => changeDate(date, false)"
              />
            </v-col>

            <v-col cols="auto">
              <v-radio-group
                v-model="filter.active"
                :label="$t(COMBO.FILTER.LABELS.ACTIVE)"
              >
                <v-radio
                  :label="$t(COMBO.FILTER.LABELS.ACTIVE_OPTIONS.ALL)"
                  :value="NOT_SELECTED"
                ></v-radio>
                <v-radio
                  :label="$t(COMBO.FILTER.LABELS.ACTIVE_OPTIONS.YES)"
                  :value="true"
                ></v-radio>
                <v-radio
                  :label="$t(COMBO.FILTER.LABELS.ACTIVE_OPTIONS.NOT)"
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
import combosConstants from "@/store/modules/combos/constants";
import i18nConstants from "@/i18n/constants";

const NOT_SELECTED = "NONE";

export default {
  props: ["loading", "filtered"],
  data() {
    return {
      page: 1,
      filter: {
        name: "",
        active: NOT_SELECTED,
        onSale: NOT_SELECTED,
        beginEndSale: "",
        endEndSale: "",
      },
      source: "",
    };
  },
  computed: {
    ...mapState(combosConstants.MODULE_NAME, ["showFilter"]),
  },
  watch: {
    showFilter(val) {
      if (val === true) {
        if (this.filtered.onSale == undefined || this.filtered.onSale == "") {
          this.filtered.onSale = NOT_SELECTED;
        }

        if (this.filtered.active == undefined || this.filtered.active == "") {
          this.filtered.active = NOT_SELECTED;
        }

        this.filter = { ...this.filtered };
      } else {
        this.clearFilter();
      }
    },
  },
  methods: {
    ...mapMutations(combosConstants.MODULE_NAME, [
      combosConstants.MUTATION_SET_SHOW_FILTER,
    ]),
    closeFilter() {
      this[combosConstants.MUTATION_SET_SHOW_FILTER](false);
    },
    clearFilter() {
      this.$refs.form.reset();
      this.filter = {
        active: NOT_SELECTED,
        onSale: NOT_SELECTED,
      };
    },
    onFilter() {
      this.$emit("onFilter", {
        ...this.filter,
        active: this.filter.active === NOT_SELECTED ? "" : this.filter.active,
        onSale: this.filter.onSale === NOT_SELECTED ? "" : this.filter.onSale,
      });
    },
    changeDate(date, begin) {
      if (begin) this.filter.beginEndSale = date;
      else this.filter.endEndSale = date;
    },
  },
  created() {
    this.COMBO = i18nConstants.COMBO;
    this.NOT_SELECTED = NOT_SELECTED;
  },
};
</script>