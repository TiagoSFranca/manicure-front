<template>
  <v-app-bar
    app
    flat
    dense
    color="primary"
    class="deep-purple accent-4"
    height="70"
  >
    <v-app-bar-nav-icon
      @click="onToggleDrawer()"
      v-if="$vuetify.breakpoint.smAndDown"
    ></v-app-bar-nav-icon>

    <div class="flex-grow-1"></div>
    <template>
      <v-btn icon>
        <v-badge overlap>
          <template v-slot:badge>0</template>
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapState("auth", ["isAuth"]),
  },
  methods: {
    ...mapMutations(appConstants.MODULE_NAME, [
      appConstants.MUTATION_TOGGLE_DRAWER,
    ]),
    onToggleDrawer() {
      this[appConstants.MUTATION_TOGGLE_DRAWER]();
    },
  },
};
</script>