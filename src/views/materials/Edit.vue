<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex>
        <core-page-title :title="$t(MATERIAL.EDIT.NAME)">
          <v-col cols="auto" class="ml-auto">
            <v-btn
              color="error"
              outlined
              icon
              large
              :loading="loading[LOADING_IDENTIFIER]"
              :to="MATERIALS"
              exact
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
        </core-page-title>
        <v-row>
          <v-col cols="12" sm="12" lg="12" md="12">
            <material-materials-card-info
              :isEdit="true"
              :isLoading="loading[LOADING_IDENTIFIER]"
              :object="material"
              :showActions="true"
            />
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-btn
              elevation="2"
              color="error"
              outlined
              @click="() => onShowUpdateStock(false)"
            >
              <v-icon left>mdi-minus</v-icon>
              {{ $t(MATERIAL.EDIT.LABELS.REMOVE_FROM_STOCK) }}
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              elevation="2"
              color="accent"
              outlined
              @click="() => onShowUpdateStock(true)"
            >
              <v-icon left>mdi-plus</v-icon>
              {{ $t(MATERIAL.EDIT.LABELS.ADD_ON_STOCK) }}
            </v-btn>
          </v-col>
        </v-row>
        <material-materials-update-stock
          :showUpdateStock="showUpdateStock"
          @fechar="showUpdateStock = false"
          :material="material"
          :isAdd="isAdd"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import materialsActions from "@/actions/materialsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import { MATERIALS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showUpdateStock: false,
      source: "",
      LOADING_IDENTIFIER: "searchMaterial",
      MATERIALS: MATERIALS,
      isAdd: false,
    };
  },
  methods: {
    searchMaterial() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      materialsActions.get(id, this.source, this.LOADING_IDENTIFIER);
    },
    onShowUpdateStock(isAdd) {
      this.showUpdateStock = true;
      this.isAdd = isAdd;
    },
  },
  created() {
    this.searchMaterial();
    this.MATERIAL = i18nConstants.MATERIAL;
  },
  computed: {
    ...mapState(materialsConstants.MODULE_NAME, ["material", "search"]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    search(val) {
      if (val) this.searchMaterial();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
