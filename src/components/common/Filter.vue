<template>
  <v-overlay :value="showFilter" z-index="200">
    <v-bottom-sheet :value="showFilter" hide-overlay persistent>
      <v-sheet class="text-center">
        <v-row>
          <v-col>
            <div class="title">
              {{ title }}
            </div>
          </v-col>
        </v-row>
        <slot />
        <v-row>
          <v-col>
            <v-btn
              class="mx-6"
              color="error"
              @click="onCloseFilter()"
              icon
              fab
              small
            >
              <v-icon>mdi-close</v-icon></v-btn
            >
            <v-btn
              class="mx-6"
              color="accent"
              @click="onClearFilter()"
              icon
              fab
              small
              :loading="loading"
              ><v-icon>mdi-delete-empty-outline</v-icon></v-btn
            >
            <v-btn
              class="mx-6"
              color="success"
              @click="onFilter()"
              icon
              fab
              large
              :loading="loading"
              ><v-icon>mdi-magnify</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-sheet>
    </v-bottom-sheet>
  </v-overlay>
</template>

<script>
export default {
  props: ["loading", "title", "showFilter"],
  data() {
    return {};
  },
  methods: {
    onCloseFilter() {
      this.$emit("onCloseFilter");
    },
    onClearFilter() {
      this.$emit("onClearFilter");
    },
    onFilter() {
      this.$emit("onFilter");
    },
  },
};
</script>