<template>
  <div>
    <core-page-title :title="$t(MATERIAL.DETAILS.NAME)">
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
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="material"
          :showActions="false"
        />
      </v-col>
    </v-row>
    <v-divider class="my-2" />
    <material-materials-card-graphs />
    <v-divider class="my-2" />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-materials-card-historic
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="material"
          :showActions="false"
        />
      </v-col>
    </v-row>
  </div>
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
      source: "",
      LOADING_IDENTIFIER: "searchMaterial",
      MATERIALS: MATERIALS,
    };
  },
  methods: {
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_SET_REPORT_REGISTER_YEAR,
      materialsConstants.MUTATION_SET_REPORT_REMOVE_YEAR,
    ]),
    searchMaterial() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      materialsActions.get(id, this.source, this.LOADING_IDENTIFIER);
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
