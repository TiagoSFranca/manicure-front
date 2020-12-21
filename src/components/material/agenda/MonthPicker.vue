<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        outlined
        v-bind="attrs"
        v-on="on"
        :loading="loading"
        :color="color"
      >
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
    </template>
    <v-date-picker
      v-model="dateValue"
      @input="menu = false"
      type="month"
      @click:month="changeDate"
      :no-title="true"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { formatDate } from "@/utils/methods";
import moment from "moment";

export default {
  props: ["loading", "color"],
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
    },
    menu() {
      this.dateValue = "";
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      return formatDate(date, "MM/YYYY");
    },
    changeDate(date) {
      let newDate = moment(date, "YYYY-MM-DD").format("YYYY-MM");
      this.$emit("changeDate", newDate);
    },
  },
  mounted() {
    this.dateValue = this.date;
  },
};
</script>