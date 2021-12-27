<template>
  <div>
    <core-page-title :title="$t(MATERIAL.DETAILS.NAME)">
      <v-col cols="auto">
        <v-btn
          color="accent"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="{
            name: MATERIALS_EDIT.name,
            params: { id: $route.params.id },
          }"
          exact
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          color="primary"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="MATERIALS"
          exact
        >
          <v-icon>{{ MATERIALS.icon }}</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-materials-cards-info
          :isEdit="false"
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="material"
          :showActions="false"
        />
      </v-col>
    </v-row>
    <v-divider />
    <material-materials-cards-graphs />
    <v-divider />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-materials-cards-historic />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import materialsActions from "@/actions/materialsActions";
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";
import materialsConstants from "@/store/modules/materials/constants";
import { MATERIALS, MATERIALS_EDIT } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      LOADING_IDENTIFIER: "searchMaterial",
      MATERIALS: MATERIALS,
      MATERIALS_EDIT: MATERIALS_EDIT,
    };
  },
  methods: {
    ...mapMutations(materialsConstants.MODULE_NAME, [
      materialsConstants.MUTATION_SET_REPORT_REGISTER_YEAR,
      materialsConstants.MUTATION_SET_REPORT_REMOVE_YEAR,
    ]),
    searchMaterial() {
      let id = this.$route.params.id;
      materialsActions.get(id, uuidv4(), this.LOADING_IDENTIFIER);
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
};
</script>
