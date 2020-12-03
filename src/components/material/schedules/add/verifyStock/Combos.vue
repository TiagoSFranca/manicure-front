<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        {{ combo.combo.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <card-products :products="combo.products" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import CardProducts from "./CardProducts.vue";
export default {
  components: { CardProducts },
  props: ["combo"],
};
</script>
