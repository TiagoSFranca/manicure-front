<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        :label="label"
        persistent-hint
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        @blur="dateValue = parseDate(dateFormatted)"
        v-on="on"
        :disabled="!readonly && disabled"
        :readonly="readonly"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateValue"
      no-title
      @input="menu = false"
      @click:date="changeDate"
    />
  </v-menu>
</template>

<script>
import moment from "moment";

export default {
  props: ["disabled", "label", "date", "readonly"],
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
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      return moment(date).format("DD/MM/YYYY");
    },
    parseDate(date) {
      if (!date) return null;
      return moment(date, "DD/MM/YYYY").toJSON();
    },
    changeDate(date) {
      let newDate = moment(date, "YYYY-MM-DD").toJSON();
      this.$emit("changeDate", newDate);
    },
  },
  mounted() {
    this.dateValue = this.date;
  },
};
</script>