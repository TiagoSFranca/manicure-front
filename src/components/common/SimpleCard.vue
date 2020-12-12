<template>
  <v-card :loading="isLoading">
    <v-card-title>
      <span class="overline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  props: ["isLoading", "title"],
};
</script>