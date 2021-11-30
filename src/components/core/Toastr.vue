<template>
  <v-snackbar
    v-model="toastr.show"
    :color="toastr.color"
    :timeout="toastr.timeout * (errors.length > 0 ? errors.length : 1)"
    bottom
    right
    rounded
    outlined
    multi-line
    elevation="5"
    max-width="60px"
  >
    <div>
      {{ toastr.text }}
    </div>

    <v-list color="rgb(255, 0, 0, 0)" v-if="errors.length > 0">
      <v-list-group
        v-for="error in errors"
        :key="error.key"
        no-action
        value="true"
        color="info"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="error.key"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="itemError in error.list" :key="itemError">
          <v-list-item-content>
            <v-list-item-title v-text="itemError"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <template v-slot:action="{ attrs }">
      <v-btn dark color="info" icon fab v-bind="attrs" @click="onClickBtn()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";

export default {
  data() {
    return {
      errors: [],
    };
  },
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
    renderErrors() {
      if (this.toastr && this.toastr.errors) {
        let obj = this.toastr.errors;
        let result = Object.keys(obj).map((key) => ({
          key: key,
          list: obj[key],
        }));

        return result;
      }

      return [];
    },
  },
  watch: {
    toastr() {
      this.errors = this.renderErrors();
    },
  },
};
</script>
