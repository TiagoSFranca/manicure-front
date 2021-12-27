<template>
  <v-card :loading="isLoading">
    <v-card-title>
      <span class="overline">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["isLoading", "title"],
};
</script>