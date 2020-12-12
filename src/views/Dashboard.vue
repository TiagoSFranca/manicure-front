<template>
  <div>
    <h1>{{ $t(INITIAL_MESSAGE) }}</h1>
  </div>
</template>

<script>
import i18nConstants from "@/i18n/constants";
export default {
  created() {
    this[i18nConstants.INITIAL_MESSAGE] = i18nConstants.INITIAL_MESSAGE;
  },
};
</script>
