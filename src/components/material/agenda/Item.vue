<template>
  <div>
    <v-card min-width="350px" flat>
      <v-card-title>
        {{ selectedEvent.name }}
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :color="selectedEvent.color" dark v-bind="attrs" v-on="on" fab x-small>
            </v-btn>
          </template>
          <span> {{ getText(selectedEvent.schedule) }}</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-row align="center" justify="space-between" no-gutters>
          <v-col cols="auto">
            <span class="overline mr-1">Data:</span>
            <span>{{ formatDate(selectedEvent.schedule.date) }}</span>
          </v-col>
          <v-col cols="auto" v-if="selectedEvent.schedule.inLoco">
            <span>In Loco</span>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-between" no-gutters>
          <v-col cols="auto">
            <span class="overline mr-1">Cliente:</span>
            <span>{{ selectedEvent.schedule.client.name }}</span>
          </v-col>
          <v-col cols="auto">
            <v-btn
              color="warning"
              icon
              outlined
              tile
              small
              target="_blank"
              exact
              :to="{
                name: CLIENTS_DETAILS.name,
                params: { id: selectedEvent.schedule.idClient },
              }"
            >
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          icon
          color="success"
          :to="{
            name: SCHEDULES_FINISH.name,
            params: { id: selectedEvent.schedule.id },
          }"
          v-if="!setCancelDisabled(selectedEvent.schedule)"
          target="_blank"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn
          icon
          color="error"
          @click="cancelItem(selectedEvent.schedule)"
          v-if="!setCancelDisabled(selectedEvent.schedule)"
        >
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          :to="{
            name: SCHEDULES_DETAILS.name,
            params: { id: selectedEvent.schedule.id },
          }"
          target="_blank"
        >
          <v-icon> mdi-eye-outline </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <material-schedules-cancel
      :showCancel="showCancel"
      @close="showCancel = false"
      :schedule="scheduleToCancel"
    />
  </div>
</template>

<script>
import {
  formatDate,
  getScheduleStatusText,
  checkDisabledCancelScheduleFromStatus,
} from "@/utils/methods";
import {
  CLIENTS_DETAILS,
  SCHEDULES_ADD,
  SCHEDULES_FINISH,
  SCHEDULES_DETAILS,
} from "@/router/routes";

export default {
  props: ["selectedEvent"],
  data() {
    return {
      showCancel: false,
      scheduleToCancel: {},
      formatDate: formatDate,
      CLIENTS_DETAILS: CLIENTS_DETAILS,
      SCHEDULES_ADD: SCHEDULES_ADD,
      SCHEDULES_FINISH: SCHEDULES_FINISH,
      SCHEDULES_DETAILS: SCHEDULES_DETAILS,
    };
  },
  methods: {
    getText(item) {
      return getScheduleStatusText(item.status);
    },
    setCancelDisabled(item) {
      return checkDisabledCancelScheduleFromStatus(item.status);
    },
    cancelItem(item) {
      this.showCancel = true;
      this.scheduleToCancel = item;
    },
  },
};
</script>
