<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }" v-if="visible">
        <v-card>
          <v-card-title>
            <span class="headline">
              {{ $t(SCHEDULE.MATERIAL_ADD.NAME) }}
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
                      :label="$t(SCHEDULE.MATERIAL_ADD.LABELS.MATERIAL)"
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
                      :label="$t(SCHEDULE.MATERIAL_ADD.LABELS.QTY)"
                      v-model="object.qtyUsed"
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
              :loading="loading[LOADING_IDENTIFIER_SEARCH_MATERIALS]"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              color="accent"
              submit
              icon
              fab
              @click="handleSubmit(save)"
              :loading="loading[LOADING_IDENTIFIER_SEARCH_MATERIALS]"
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
import materialsActions from "@/actions/materialsActions";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import i18nConstants from "@/i18n/constants";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["showAdd"],
  data() {
    return {
      minLength: 3,
      visible: false,
      object: {
        idMaterial: "",
        qtyUsed: 1,
      },
      defObject: {
        idMaterial: "",
        qtyUsed: 1,
      },
      materialSelected: {},
      LOADING_IDENTIFIER_SEARCH_MATERIALS: "searchMaterialsAsync",
      prevRequest: "",
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
      this.object = this.defObject;
      this.$refs.autocomplete.clear();
    },
    show() {
      this.visible = true;
    },
    save() {
      this.$emit("addMaterial", {
        ...this.object,
        material: this.materialSelected,
      });
    },
    searchMaterials(term) {
      if ((term || "").length < this.minLength) {
        this[materialsConstants.MUTATION_CLEAR_MATERIALS]();
        return;
      }

      if (this.prevRequest) {
        axiosSourceToken.cancelToken(this.prevRequest);
        this.prevRequest = "";
      }

      this.prevRequest = uuidv4();

      this.LOADING_IDENTIFIER_SEARCH_MATERIALS =
        this.LOADING_IDENTIFIER_SEARCH_MATERIALS + `(${this.prevRequest})`;

      materialsActions.search(
        { name: term },
        null,
        null,
        this.prevRequest,
        this.LOADING_IDENTIFIER_SEARCH_MATERIALS
      );
    },
    selectMaterial(val) {
      this.object.idMaterial = val ? val.id : null;
      this.materialSelected = val;
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
    this.SCHEDULE = i18nConstants.SCHEDULE;
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>