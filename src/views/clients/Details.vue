<template>
  <div>
    <core-page-title :title="$t(CLIENT.DETAILS.NAME)">
      <v-col cols="auto">
        <v-btn
          color="primary"
          icon
          large
          :loading="loading[LOADING_IDENTIFIER]"
          :to="CLIENTS"
          exact
        >
          <v-icon>{{ CLIENTS.icon }}</v-icon>
        </v-btn>
      </v-col>
    </core-page-title>

    <v-row>
      <v-col cols="12">
        <material-clients-card-info
          :isLoading="loading[LOADING_IDENTIFIER]"
          :object="client"
        />
      </v-col>
    </v-row>

    <v-divider />
    <!-- <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-clients-card-sales />
      </v-col>
    </v-row>
    <v-divider />
    <material-clients-card-graphs />
    <v-divider />
    <v-row>
      <v-col cols="12" sm="12" lg="12" md="12">
        <material-clients-card-schedules />
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import clientsActions from "@/actions/clientsActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import clientsConstants from "@/store/modules/clients/constants";
import { CLIENTS } from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      source: "",
      LOADING_IDENTIFIER: "searchClient",
      LOADING_IDENTIFIER_IMAGES: "searchClientImages",
      LOADING_IDENTIFIER_COMBOS: "searchClientCombos",
      LOADING_IDENTIFIER_MATERIALS: "searchClientMaterials",
    };
  },
  methods: {
    searchClient() {
      let id = this.$route.params.id;
      this.source = axiosSourceToken.obterToken();
      clientsActions.get(id, this.source, this.LOADING_IDENTIFIER);
    },
    // getImages() {
    //   let id = this.$route.params.id;
    //   this.source = axiosSourceToken.obterToken();
    //   clientsActions.getImages(
    //     id,
    //     this.source,
    //     this.LOADING_IDENTIFIER_IMAGES
    //   );
    // },
    // getCombos() {
    //   let id = this.$route.params.id;
    //   this.source = axiosSourceToken.obterToken();
    //   clientsActions.getCombos(
    //     id,
    //     this.source,
    //     this.LOADING_IDENTIFIER_COMBOS
    //   );
    // },
    // getMaterials() {
    //   let id = this.$route.params.id;
    //   this.source = axiosSourceToken.obterToken();
    //   clientsActions.getMaterials(
    //     id,
    //     this.source,
    //     this.LOADING_IDENTIFIER_MATERIALS
    //   );
    // },
  },
  created() {
    this.searchClient();
    // this.getImages();
    // this.getCombos();
    // this.getMaterials();
    this.CLIENT = i18nConstants.CLIENT;
    this.CLIENTS = CLIENTS;
  },
  computed: {
    ...mapState(clientsConstants.MODULE_NAME, [
      "client",
      "images",
      "combos",
      "materials",
      "search",
      "searchImages",
      "searchMaterials",
    ]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  watch: {
    search() {
      this.searchClient();
    },
    // searchImages() {
    //   this.getImages();
    // },
    // searchMaterials() {
    //   this.getMaterials();
    // },
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
};
</script>
