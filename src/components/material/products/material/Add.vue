<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{ $t(PRODUCT.MATERIAL_ADD.NAME) }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="9">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <common-autocomplete-remote
                      :loading="loading[LOADING_IDENTIFIER_SEARCH_MATERIALS]"
                      :items="materials"
                      :errors="errors"
                      :label="$t(PRODUCT.MATERIAL_ADD.LABELS.MATERIAL)"
                      :placeholder="
                        $t(GENERAL.MESSAGES.DIGIT_MIN_LENGTH_TO_SEARCH, {
                          length: minLength,
                        })
                      "
                      option-text="name"
                      option-value="id"
                      @search="searchMaterials"
                      @select="selectMaterial"
                      v-model="object.idMaterial"
                      ref="autoComplete"
                    />
                  </validation-provider>
                </v-col>
                <v-col cols="3">
                  <validation-provider
                    rules="required|greater_than:0"
                    v-slot="{ errors }"
                  >
                    <v-currency-field
                      :label="$t(PRODUCT.MATERIAL_ADD.LABELS.QTY)"
                      v-model="object.qty"
                      :error-messages="errors"
                    />
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
              :loading="
                loading[LOADING_IDENTIFIER] ||
                loading[LOADING_IDENTIFIER_SEARCH_MATERIALS]
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              color="success"
              submit
              icon
              fab
              @click="handleSubmit(save)"
              :loading="
                loading[LOADING_IDENTIFIER] ||
                loading[LOADING_IDENTIFIER_SEARCH_MATERIALS]
              "
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
import productsActions from "@/actions/productsActions";
import materialsActions from "@/actions/materialsActions";

import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["showAdd"],
  data() {
    return {
      minLength: 3,
      visible: false,
      object: {
        idMaterial: "",
        qty: "",
      },
      LOADING_IDENTIFIER: "addProductMaterial",
      LOADING_IDENTIFIER_SEARCH_MATERIALS: "searchMaterialsAsync",
    };
  },
  methods: {
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_CLEAR_MATERIALS,
    ]),
    hide() {
      this.$refs.form.reset();
      this.$emit("close");
      this.visible = false;
      this.object = {};
      this.$refs.autoComplete.clear();
    },
    show() {
      this.visible = true;
    },
    save() {
      let id = this.$route.params.id;
      productsActions
        .addMaterial(id, this.object, this.LOADING_IDENTIFIER)
        .then((res) => {
          if (res) {
            this.hide();
          }
        });
    },
    searchMaterials(term) {
      if ((term || "").length < this.minLength) {
        this[materialsConstants.MUTATION_CLEAR_MATERIALS]();
        return;
      }

      materialsActions.search(
        { name: term },
        null,
        null,
        this.LOADING_IDENTIFIER_SEARCH_MATERIALS
      );
    },
    selectMaterial(val) {
      this.object.idMaterial = val ? val.id : null;
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
    ...mapState(materialsConstants.MODULE_NAME, ["materials"]),
  },
  watch: {
    showAdd() {
      if (this.showAdd && !this.visible) this.show();
      else if (!this.showAdd && this.visible) this.hide();
    },
  },
  created() {
    this.PRODUCT = i18nConstants.PRODUCT;
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>