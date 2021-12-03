<template>
  <div>
    <v-row justify="start" align="center">
      <v-col
        cols="auto"
        v-for="status in SCHEDULE_STATUS"
        :key="status"
        class="d-flex align-center"
      >
        <v-badge
          inline
          tile
          left
          :color="getScheduleStatusColor(status)"
        ></v-badge>
        {{ getScheduleStatusText(status) }}
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getScheduleStatusColor, getScheduleStatusText } from "@/utils/methods";
import i18nConstants from "@/i18n/constants";
import { SCHEDULE_STATUS } from "@/utils/constants";

export default {
  created() {
    this.i18nConstants = { ...i18nConstants };

    this.SCHEDULE_STATUS = Object.entries(SCHEDULE_STATUS).map((item) => {
      return item[1];
    });

    this.getScheduleStatusColor = getScheduleStatusColor;
    this.getScheduleStatusText = getScheduleStatusText;
  },
};
</script>
