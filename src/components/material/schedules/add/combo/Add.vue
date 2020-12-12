<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{ $t(SCHEDULE.ADD.COMBO_ADD.NAME) }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form>
                <v-row>
                  <v-col cols="9">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <common-autocomplete-remote
                        :loading="loading[LOADING_IDENTIFIER_SEARCH_COMBOS]"
                        :items="combos"
                        :errors="errors"
                        :label="$t(SCHEDULE.ADD.COMBO_ADD.LABELS.COMBO)"
                        :placeholder="
                          $t(GENERAL.MESSAGES.DIGIT_MIN_LENGTH_TO_SEARCH, {
                            length: minLength,
                          })
                        "
                        option-text="name"
                        option-value="id"
                        @search="searchCombos"
                        @select="selectCombo"
                        v-model="object.idCombo"
                        ref="autocomplete"
                      />
                    </validation-provider>
                  </v-col>
                  <v-col cols="3">
                    <validation-provider
                      rules="required|greater_than:0"
                      v-slot="{ errors }"
                    >
                      <v-currency-field
                        :label="$t(SCHEDULE.ADD.COMBO_ADD.LABELS.QTY)"
                        v-model="object.qty"
                        :error-messages="errors"
                      />
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
              :loading="loading[LOADING_IDENTIFIER_SEARCH_COMBOS]"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              color="accent"
              submit
              icon
              fab
              @click="handleSubmit(save)"
              :loading="loading[LOADING_IDENTIFIER_SEARCH_COMBOS]"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>
</template>

<script>
import combosActions from "@/actions/combosActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import combosConstants from "@/store/modules/combos/constants";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["showAdd"],
  data() {
    return {
      minLength: 3,
      visible: false,
      source: "",
      object: {
        idCombo: "",
        qty: 1,
      },
      defObject: {
        idCombo: "",
        qty: 1,
      },
      comboSelected: {},
      LOADING_IDENTIFIER_SEARCH_COMBOS: "searchCombosAsync",
    };
  },
  methods: {
    ...mapMutations(combosConstants.MODULE_NAME, [
      combosConstants.MUTATION_CLEAR_COMBOS,
    ]),
    hide() {
      this.$refs.form.reset();
      this.$emit("fechar");
      this.visible = false;
      this.object = this.defObject;
      this.$refs.autocomplete.clear();
    },
    show() {
      this.visible = true;
    },
    save() {
      this.$emit("addCombo", {
        ...this.object,
        combo: this.comboSelected,
      });
    },
    searchCombos(term) {
      if ((term || "").length < this.minLength) {
        this[combosConstants.MUTATION_CLEAR_COMBOS]();
        return;
      }

      combosActions.search(
        this.source,
        { name: term, active: true },
        null,
        null,
        this.LOADING_IDENTIFIER_SEARCH_COMBOS
      );
    },
    selectCombo(val) {
      this.object.idCombo = val ? val.id : null;
      this.comboSelected = val;
    },
  },
  mounted() {
    this.source = axiosSourceToken.obterToken();
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
    ...mapState(combosConstants.MODULE_NAME, ["combos"]),
  },
  watch: {
    showAdd() {
      if (this.showAdd && !this.visible) this.show();
      else if (!this.showAdd && this.visible) this.hide();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>