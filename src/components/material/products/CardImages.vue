<template>
  <v-card :loading="isLoading || loading[LOADING_IDENTIFIER]">
    <v-card-title>
      <span class="overline">imagens</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="end">
          <v-spacer></v-spacer>
          <v-col cols="4">
            <common-file-upload
              :loading="isLoading || loading[LOADING_IDENTIFIER]"
              :disabled="!isEdit || isLoading || loading[LOADING_IDENTIFIER]"
              label="Adicionar imagem"
              :clear="isLoading || loading[LOADING_IDENTIFIER]"
              @upload="addImage"
              accept="image/*"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="n in images"
            :key="n.id"
            class="d-flex child-flex"
            cols="12"
            sm="4"
            lg="2"
            md="2"
          >
            <common-hover-image
              :image="{
                src: n.src,
              }"
              :lazy="true"
              :disabled="!isEdit"
            >
              <v-icon @click="onDeleteImage(n.id)" color="error" x-large
                >mdi-delete-outline</v-icon
              >
            </common-hover-image>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <common-confirm-dialog
      :showDialog="showDialog"
      title="Atenção!"
      message="Tem certeza que deseja excluir a imagem?"
      @close="showDialog = false"
    >
      <template slot="actions">
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="cancel()"
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
          :disabled="!isEdit"
          @click="confirmDelete()"
          :loading="isLoading || loading[LOADING_IDENTIFIER]"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </common-confirm-dialog>
  </v-card>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  props: ["images", "isEdit", "isLoading"],
  data() {
    return {
      LOADING_IDENTIFIER: "deleteImageProduct",
      item: {},
      showDialog: false,
      idSelected: "",
    };
  },
  methods: {
    changeDate(date) {
      this.item.endSale = date;
    },
    onDeleteImage(id) {
      this.idSelected = id;
      this.showDialog = true;
    },
    cancel() {
      this.idSelected = "";
      this.showDialog = false;
    },
    confirmDelete() {
      productsActions.deleteImage(this.idSelected, this.LOADING_IDENTIFIER);
      this.cancel();
    },
    addImage(image) {
      productsActions.addImage(this.idSelected, image, this.LOADING_IDENTIFIER);
    },
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    object() {
      this.item = { ...this.object };
    },
  },
};
</script>