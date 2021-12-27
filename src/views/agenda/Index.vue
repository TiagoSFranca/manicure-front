<template>
  <div>
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
                <v-btn v-bind="attrs" v-on="on" outlined text color="accent">
                  <span>{{ type.label }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = types.DAY">
                  <v-list-item-title>{{ types.DAY.label }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = types.WEEK">
                  <v-list-item-title>{{ types.WEEK.label }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = types.MONTH">
                  <v-list-item-title>{{ types.MONTH.label }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text>
            <material-agenda-schedule-status />
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :event-color="getEventColor"
                :type="type.value"
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
import { mapState } from "vuex";
import { getScheduleStatusColor, getScheduleStatusText } from "@/utils/methods";
import appConstants from "@/store/modules/app/constants";
import agendaConstants from "@/store/modules/agenda/constants";
import { SCHEDULES_ADD } from "@/router/routes";
import i18nConstants from "@/i18n/constants";
import { AGENDA_TYPES, SCHEDULE_STATUS } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";

export default {
  data: () => ({
    focus: "",
    type: AGENDA_TYPES.MONTH,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    LOADING_IDENTIFIER: "searchSchedules",
    beginDate: "",
    endDate: "",
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    changeDate(date) {
      this.focus = `${date}-01`;
      this.type = this.types.MONTH;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = this.types.DAY;
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
      this.type = this.types.MONTH;
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
          start: new Date(this.getStart(item)),
          schedule: item,
          end: new Date(this.getEnd(item)),
          color: getScheduleStatusColor(item.status),
        };
      });

      this.events = newList;
    },
    getStart(item) {
      if (item.status === SCHEDULE_STATUS.FINISHED) return item.finishDate;
      if (item.status === SCHEDULE_STATUS.CANCELED) return item.cancelDate;
      return item.date;
    },
    getEnd(item) {
      return this.getStart(item);
    },
    searchAgenda() {
      agendaActions.search(
        { beginDate: this.beginDate, endDate: this.endDate },
        this.pagination,
        this.sort,
        uuidv4(),
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

    this.SCHEDULE_STATUS = Object.entries(SCHEDULE_STATUS).map((item) => {
      return item[1];
    });

    this.SCHEDULES_ADD = SCHEDULES_ADD;
    this.getScheduleStatusColor = getScheduleStatusColor;
    this.getScheduleStatusText = getScheduleStatusText;
    this.types = AGENDA_TYPES;
  },
  computed: {
    ...mapState(agendaConstants.MODULE_NAME, ["agenda", "search"]),
    ...mapState(appConstants.MODULE_NAME, ["loading"]),
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
