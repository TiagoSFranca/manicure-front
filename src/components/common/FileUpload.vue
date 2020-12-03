<template>
  <v-row no-gutters justify="end" align="center">
    <v-col cols="10">
      <v-file-input
        show-size
        :label="label"
        @change="selectFile"
        prepend-icon="mdi-image"
        :disabled="disabled"
        :loading="loading"
        ref="fileInput"
        v-model="currentFile"
        :accept="accept"
      ></v-file-input>
    </v-col>

    <v-col cols="auto">
      <v-btn
        color="success"
        outlined
        small
        tile
        dark
        @click="upload"
        :loading="loading"
        :disabled="!currentFile || disabled"
      >
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["loading", "disabled", "label", "clear", "accept"],
  data() {
    return {
      currentFile: null,
    };
  },
  methods: {
    selectFile(file) {
      this.currentFile = file;
    },
    upload() {
      this.$emit("upload", this.currentFile);
    },
  },
  watch: {
    clear(value) {
      this.currentFile = null;
    },
  },
};
</script>