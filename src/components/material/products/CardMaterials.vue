<template>
  <v-card
    :loading="isLoading"
    :height="height"
    :class="`${height ? 'd-flex flex-column' : ''}`"
  >
    <v-card-title class="d-flex align-start">
      <span class="overline">materiais</span>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isEdit"
        color="accent"
        outlined
        rounded
        dark
        small
        icon
        @click="showAdd = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-container>
        <material-products-material-list :materials="materials" />
      </v-container>
    </v-card-text>
    <material-products-material-add
      :showAdd="showAdd"
      @fechar="showAdd = false"
    />
  </v-card>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  data() {
    return {
      showAdd: false,
    };
  },
  props: ["materials", "isLoading", "isEdit", "height"],
  methods: {
    seeCombo(material) {
      this.$router.push({ path: "/GOOGLE".replace(":id", material.id) });
    },
  },
};
</script>