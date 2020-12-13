<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <validation-observer ref="form" v-slot="{ handleSubmit }">
        <v-card :disabled="loading[LOADING_IDENTIFIER]">
          <v-card-title>
            <span class="headline">
              {{ isAdd ? "Adicionar ao estoque" : "Remover do estoque" }}
            </span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <validation-provider rules="max:512" v-slot="{ errors }">
                    <v-textarea
                      :label="$t(SCHEDULE.CANCEL.LABELS.CANCELLATION_REASON)"
                      v-model="object.cancellationReason"
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
import agendaActions from "@/actions/agendaActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { SCHEDULES_EDIT } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import { formatDate } from "@/utils/methods";

export default {
  props: ["showUpdateStock", "material", "isAdd"],
  data() {
    return {
      visible: false,
      object: {
        cancellationReason: null,
      },
      LOADING_IDENTIFIER: "updateStock",
      formatDate: formatDate,
    };
  },
  methods: {
    hide() {
      this.$refs.form.reset();
      this.$emit("fechar");
      this.visible = false;
      this.object = { cancellationReason: null };
    },
    show() {
      this.visible = true;
    },
    save() {
      agendaActions
        .cancel(this.material.id, this.object, this.LOADING_IDENTIFIER)
        .then((res) => {
          if (res.success) {
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
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>