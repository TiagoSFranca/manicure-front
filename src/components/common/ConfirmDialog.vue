<template>
  <common-dialog :showDialog="showDialog" :title="title" @close="close">
    <v-card-text>
      {{ message }}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </common-dialog>
</template>

<script>
export default {
  props: ["showDialog", "title", "message"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>