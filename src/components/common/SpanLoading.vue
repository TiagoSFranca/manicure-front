<template>
  <span :class="classes">
    <slot v-if="!loading" />
    <v-progress-circular indeterminate :color="color" v-else />
  </span>
</template>

<script>
export default {
  props: ["classes", "loading", "color"],
};
</script>