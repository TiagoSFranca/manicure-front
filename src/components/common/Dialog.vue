<template>
  <v-dialog :value="showDialog" width="500" @click:outside="close">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["showDialog", "title"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>