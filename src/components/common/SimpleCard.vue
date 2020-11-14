<template>
  <v-card :loading="isLoading" height="100%">
    <v-card-title>
      <span class="overline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <slot />
      </v-container>
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