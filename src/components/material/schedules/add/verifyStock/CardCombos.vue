<template>
  <v-card>
    <v-card-title>
      <span class="overline">COMBOS</span>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <combos
            v-for="combo in combos"
            :key="combo.idCombo"
            v-bind:combo="combo"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Combos from "./Combos.vue";

export default {
  components: { Combos },
  props: ["combos"],
};
</script>