<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        :loading-text="$t(i18nConstants.LOADING_MESSAGE)"
        hide-default-footer
        :custom-sort="onSort"
        :disable-pagination="true"
        :disable-filtering="true"
        :disable-sort="!!loading"
        :loading="loading === true"
        :multi-sort="false"
        :no-data-text="$t(i18nConstants.DATA_NOT_FOUND)"
      >
        <template
          v-for="(x, slotName) in $scopedSlots"
          v-slot:[slotName]="context"
        >
          <slot :name="slotName" v-bind="context" />
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import i18nConstants from "@/i18n/constants";

export default {
  props: ["loading", "headers", "items", "sort"],
  data() {
    return {};
  },
  methods: {
    onSort(items, index, isDesc) {
      let newSort = this.sort;

      let prevSort = this.sort;

      if (index && index.length > 0) {
        newSort = {
          orderBy: index[0],
          asc: !isDesc[0],
        };
      }

      if (
        prevSort.orderBy !== newSort.orderBy ||
        prevSort.asc !== newSort.asc
      ) {
        this.$emit("onSort", newSort);
      }

      return items;
    },
  },
  created() {
    this.i18nConstants = { ...i18nConstants };
  },
};
</script>
