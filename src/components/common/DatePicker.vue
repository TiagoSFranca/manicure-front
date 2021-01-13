<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        :label="label"
        persistent-hint
        v-bind="attrs"
        @blur="blur"
        v-on="on"
        readonly
        :error-messages="errors"
        :clearable="!disabled"
        @click:clear="clear"
        :disabled="disabled"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateValue"
      no-title
      @input="menu = false"
      @click:date="changeDate"
      @change="change"
      @blur="blur"
      :min="min"
      :max="max"
    />
  </v-menu>
</template>

<script>
import { formatDate } from "@/utils/methods";
import moment from "moment";

export default {
  props: ["disabled", "label", "date", "errors", "min", "max"],
  data() {
    return {
      menu: false,
      dateFormatted: "",
      dateValue: "",
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.dateValue);
    },
  },
  watch: {
    dateValue() {
      this.dateFormatted = this.formatDate(this.dateValue);
      // if (this.date && !this.curr) this.changeDate(null);
    },
    date() {
      this.dateValue = this.date;
    },
  },
  methods: {
    formatDate(date) {
      if (!date) {
        this.changeDate();
        return null;
      }
      return formatDate(date);
    },
    parseDate(date) {
      if (!date) return null;
      return moment(date, "DD/MM/YYYY").toJSON();
    },
    changeDate(date) {
      let newDate = moment(date, "YYYY-MM-DD").toJSON();
      this.$emit("changeDate", newDate);
    },
    blur() {
      this.dateValue = this.parseDate(this.dateFormatted);
      this.$emit("blur");
    },
    change() {
      this.$emit("change");
    },
    clear() {
      this.changeDate(null);
    },
  },
  mounted() {
    this.dateValue = this.date;
  },
};
</script>