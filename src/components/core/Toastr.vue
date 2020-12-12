<template>
  <v-snackbar
    v-model="toastr.show"
    :color="toastr.color"
    :timeout="toastr.timeout"
    bottom
    right
  >
    {{ toastr.text }}
    <v-btn color="primary" text @click="onClickBtn()"> Fechar </v-btn>
  </v-snackbar>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["toastr"]),
  },
  methods: {
    ...mapMutations(appConstants.MODULE_NAME, [
      appConstants.MUTATION_SET_TOASTR,
    ]),
    onClickBtn() {
      this[appConstants.MUTATION_SET_TOASTR]({ show: false });
    },
  },
};
</script>
