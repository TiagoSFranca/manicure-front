<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        {{ isOpen(open) }}
        <span v-if="open" key="0"></span>
        <span v-else key="1" class="overline text-truncate">
          {{ material.material.name }}
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content v-if="!isEdit">
        <v-row align="start">
          <v-col cols="12" class="text-left pt-0">
            <span class="overline"> {{ material.material.name }}</span>
          </v-col>
          <v-col cols="12" class="text-left">
            <span class="overline">Quantidade:</span>
            <span class="ml-2 caption">{{ material.qty }}</span>
          </v-col>
          <v-col cols="12" class="text-left pt-0">
            <span class="overline">Valor unitário:</span>
            <span class="ml-2 caption">{{
              toCurrency(material.material.price)
            }}</span>
          </v-col>
        </v-row>

        <v-card-actions v-if="showActions">
          <v-spacer></v-spacer>
          <v-btn dark icon color="accent" @click="onEdit">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn dark icon color="error" @click="onShowDialog()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
      <v-expansion-panel-content v-else>
        <validation-observer ref="form" v-slot="{ handleSubmit }">
          <v-form>
            <v-row class="py-0">
              <v-col cols="12" class="py-0">
                <validation-provider
                  rules="required|greater_than:0"
                  v-slot="{ errors }"
                >
                  <v-currency-field
                    label="Quantidade"
                    v-model="object.qty"
                    :error-messages="errors"
                  />
                </validation-provider>
              </v-col>
            </v-row>
          </v-form>

          <v-card-actions v-if="showActions">
            <v-spacer></v-spacer>
            <v-btn dark icon color="error" @click="isEdit = false">
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
            <v-btn
              dark
              icon
              color="success"
              @click="handleSubmit(onShowDialog(true))"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </validation-observer>
      </v-expansion-panel-content>

      <common-confirm-dialog
        :showDialog="showDialog"
        title="Atenção!"
        :message="message"
        @close="showDialog = false"
      >
        <template slot="actions">
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="showDialog = false"
            icon
            fab
            :loading="isLoading || loading[LOADING_IDENTIFIER]"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-btn
            color="success"
            submit
            icon
            fab
            @click="confirmDialog()"
            :loading="isLoading || loading[LOADING_IDENTIFIER]"
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
      </common-confirm-dialog>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { ToCurrency } from "@/utils/methods";

export default {
  props: ["material", "showActions"],
  data() {
    return {
      showAdd: false,
      isEdit: false,
      showDialog: false,
      isLoading: false,
      LOADING_IDENTIFIER: "updateOrDeleteProductMaterial",
      message: "",
      object: {
        qty: null,
      },
    };
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  methods: {
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    onEdit() {
      this.isEdit = true;
      this.object = { ...this.material };
    },
    onShowDialog(isEdit = false) {
      this.showDialog = true;

      this.message = !isEdit
        ? "Tem certeza que deseja excluir o material?"
        : "Tem certeza que deseja editar o material?";
    },
    edit(id) {
      productsActions.editMaterial(
        id,
        this.material.id,
        this.object,
        this.LOADING_IDENTIFIER
      );
      this.showDialog = false;
      this.isEdit = false;
    },
    delete(id) {
      productsActions.deleteMaterial(
        id,
        this.material.id,
        this.LOADING_IDENTIFIER
      );
      this.showDialog = false;
    },
    confirmDialog() {
      let id = this.$route.params.id;
      this.isEdit ? this.edit(id) : this.delete(id);
    },
    isOpen(open) {
      if (!open) this.isEdit = false;
    },
  },
};
</script>