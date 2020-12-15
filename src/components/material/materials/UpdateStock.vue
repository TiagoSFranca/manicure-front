<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card :disabled="loading[LOADING_IDENTIFIER]">
          <v-card-title>
            <span class="headline">
              {{
                $t(
                  isAdd
                    ? MATERIAL.UPDATE_STOCK.NAME_ADD
                    : MATERIAL.UPDATE_STOCK.NAME_REMOVE
                )
              }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" lg="4" md="4" offset="8">
                  <validation-provider
                    rules="required|greater_than:0"
                    v-slot="{ errors }"
                  >
                    <v-currency-field
                      :label="$t(MATERIAL.UPDATE_STOCK.LABELS.QTY)"
                      v-model="object.qty"
                      :error-messages="errors"
                    />
                  </validation-provider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <validation-provider rules="max:512" v-slot="{ errors }">
                    <v-textarea
                      :label="$t(MATERIAL.UPDATE_STOCK.LABELS.COMMENTS)"
                      v-model="object.comments"
                      :error-messages="errors"
                      counter="512"
                    ></v-textarea>
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
              :loading="loading[LOADING_IDENTIFIER]"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              color="success"
              submit
              icon
              fab
              @click="handleSubmit(save)"
              :loading="loading[LOADING_IDENTIFIER]"
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
import materialsActions from "@/actions/materialsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import i18nConstants from "@/i18n/constants";
import { formatDate } from "@/utils/methods";

export default {
  props: ["showUpdateStock", "material", "isAdd"],
  data() {
    return {
      visible: false,
      object: {
        qty: null,
        comments: null,
      },
      defObject: {
        qty: null,
        comments: null,
      },
      LOADING_IDENTIFIER: "updateStock",
      formatDate: formatDate,
    };
  },
  methods: {
    hide() {
      this.$refs.form.reset();
      this.$emit("close");
      this.visible = false;
      this.object = { ...this.defObject };
    },
    show() {
      this.visible = true;
    },
    save() {
      materialsActions
        .updateStock(
          this.material.id,
          { ...this.object, isAdd: this.isAdd },
          this.LOADING_IDENTIFIER
        )
        .then((res) => {
          if (res) {
            this.hide();
          }
        });
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    showUpdateStock() {
      if (this.showUpdateStock && !this.visible) this.show();
      else if (!this.showUpdateStock && this.visible) this.hide();
    },
  },
  created() {
    this.MATERIAL = i18nConstants.MATERIAL;
  },
};
</script>