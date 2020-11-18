<template>
  <v-expansion-panels>
    <material-products-material-item
      v-for="material in materials"
      :key="material.id"
      v-bind:material="material"
      :showActions="isEdit"
    />
  </v-expansion-panels>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  props: ["materials", "isEdit"],
  data() {
    return {
      showAdd: false,
    };
  },
  methods: {
    seeCombo(material) {
      this.$router.push({ path: "/GOOGLE".replace(":id", material.id) });
    },
  },
};
</script>