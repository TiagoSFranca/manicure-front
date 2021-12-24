<template>
  <v-card
    :loading="isLoading || loading[LOADING_IDENTIFIER]"
    :disabled="isLoading || loading[LOADING_IDENTIFIER]"
  >
    <v-card-title>
      <span class="overline">{{ $t(COMBO.CARD_IMAGES.NAME) }}</span>
    </v-card-title>
    <v-card-text>
      <v-row align="end">
        <v-spacer></v-spacer>
        <v-col cols="4">
          <common-file-upload
            :loading="isLoading || loading[LOADING_IDENTIFIER]"
            :disabled="!isEdit || isLoading || loading[LOADING_IDENTIFIER]"
            :label="$t(COMBO.CARD_IMAGES.LABELS.ADD_IMAGE)"
            :clear="isLoading || loading[LOADING_IDENTIFIER]"
            @upload="addImage"
            accept=".png,.jpg"
            v-if="isEdit"
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
          md="3"
        >
          <common-hover-image
            :image="{
              src: n.url,
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
    </v-card-text>
    <common-confirm-dialog
      :showDialog="showDialog"
      :title="$t(COMBO.CARD_IMAGES.MESSAGES.CONFIRM_DELETE.TITLE)"
      :message="$t(COMBO.CARD_IMAGES.MESSAGES.CONFIRM_DELETE.MESSAGE)"
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
import combosActions from "@/actions/combosActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["images", "isEdit", "isLoading"],
  data() {
    return {
      LOADING_IDENTIFIER: "deleteImageCombo",
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
      let id = this.$route.params.id;
      combosActions.deleteImage(id, this.idSelected, this.LOADING_IDENTIFIER);
      this.cancel();
    },
    addImage(image) {
      let id = this.$route.params.id;
      combosActions.addImage(id, image, this.LOADING_IDENTIFIER);
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
  created() {
    this.COMBO = i18nConstants.COMBO;
  },
};
</script>