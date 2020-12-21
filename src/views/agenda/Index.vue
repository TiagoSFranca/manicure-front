<template>
  <div>
    <core-page-title :title="$tc(i18nConstants.SCHEDULE.NAME, 2)">
    </core-page-title>

    <v-row class="fill-height">
      <v-col>
        <v-card
          :loading="loading[LOADING_IDENTIFIER]"
          :disabled="loading[LOADING_IDENTIFIER]"
        >
          <v-card-title>
            <v-btn text outlined @click="prev" color="accent">
              <v-icon> mdi-calendar-arrow-left </v-icon>
            </v-btn>
            <v-btn text outlined @click="setToday" class="mx-1" color="accent">
              <v-icon> mdi-calendar-check-outline </v-icon>
            </v-btn>
            <v-btn text outlined @click="next" color="accent">
              <v-icon> mdi-calendar-arrow-right </v-icon>
            </v-btn>
            <v-spacer />
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer />
            <material-agenda-month-picker
              @changeDate="changeDate"
              color="accent"
            />
            <v-btn
              text
              outlined
              @click="refresh"
              :class="`ml-1`"
              color="accent"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn
              text
              outlined
              class="mx-1"
              :to="SCHEDULES_ADD"
              target="_blank"
              color="accent"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  text
                  color="accent"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Diário</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semanal</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mensal</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                @change="updateRange"
                first-interval="0"
                interval-minutes="0"
                interval-count="0"
              ></v-calendar>
              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
              >
                <material-agenda-item :selectedEvent="selectedEvent" />
              </v-menu>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import agendaActions from "@/actions/agendaActions";
import axiosSourceToken from "@/utils/axiosSourceToken";
import { mapState, mapMutations } from "vuex";
import {
  formatDate,
  getScheduleStatusText,
  getScheduleStatusColor,
  checkDisabledCancelScheduleFromStatus,
} from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import agendaConstants from "@/store/modules/agenda/constants";
import {
  SCHEDULES_ADD,
  SCHEDULES_FINISH,
  SCHEDULES_DETAILS,
} from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Mensal",
      week: "Semanal",
      day: "Diário",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    LOADING_IDENTIFIER: "searchSchedules",
    beginDate: "",
    endDate: "",
    SCHEDULES_ADD: SCHEDULES_ADD,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    changeDate(date) {
      this.focus = `${date}-01`;
      this.type = "month";
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    refresh() {
      this.focus = "";
      this.type = "month";
      this.searchAgenda();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      this.beginDate = start.date;
      this.endDate = end.date;

      this.searchAgenda();
    },
    mountAgenda() {
      this.events = [];

      let newList = this.agenda.map((item) => {
        return {
          name: "#" + item.id,
          start: new Date(item.date),
          schedule: item,
          end: new Date(item.date),
          color: getScheduleStatusColor(item.status),
        };
      });

      this.events = newList;
    },
    searchAgenda() {
      this.source = axiosSourceToken.obterToken();
      agendaActions.search(
        this.source,
        { beginDate: this.beginDate, endDate: this.endDate },
        this.pagination,
        this.sort,
        this.LOADING_IDENTIFIER
      );

      this.closeEvent();
    },
    closeEvent() {
      this.selectedOpen = false;
      this.selectedEvent = {};
      this.selectedElement = null;
    },
  },
  created() {
    this.i18nConstants = { ...i18nConstants };
  },
  computed: {
    ...mapState(agendaConstants.MODULE_NAME, ["agenda", "search"]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
  },
  beforeRouteLeave(to, from, next) {
    this.source.cancel();
    next();
  },
  watch: {
    agenda() {
      this.mountAgenda();
    },
    search() {
      this.searchAgenda();
    },
  },
};
</script>