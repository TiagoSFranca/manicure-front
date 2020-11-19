<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-fade-transition leave-absolute>
          <span v-if="open" key="0"></span>
          <span v-else key="1" class="overline text-truncate">
            {{ combo.name }}
          </span>
        </v-fade-transition>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row align="start">
          <v-col cols="12" class="text-left pt-0">
            <span class="overline">{{ combo.name }}</span>
          </v-col>
          <v-col cols="12" class="text-left">
            <span class="caption"> {{ combo.description }}</span>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark icon @click="seeCombo(combo)">
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  props: ["combo"],
  methods: {
    seeCombo(combo) {
      this.$router.push({ path: "/GOOGLE".replace(":id", combo.id) });
    },
  },
};
</script>