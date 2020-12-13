<template>
  <v-row align="center">
    <v-col cols="auto" class="mr-auto">
      <span class="title white--text">
        {{ title }}
      </span>
    </v-col>
    <slot />
  </v-row>
</template>

<script>
export default {
  props: ["title"],
};
</script>
