<template>
  <v-navigation-drawer permanent expand-on-hover app color="primary">
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-content>
          <v-list-item-title class="title">Manicure</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item v-for="item in links" :key="item.text" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="text-left">{{
            item.text
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block v-if="isAuth" large outlined text @click="logout()">
          Sair
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import routes from "@/router/routes";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      mini: true,
      links: [
        {
          to: routes.DASHBOARD,
          icon: "mdi-view-dashboard",
          text: this.$t(i18nConstants.DASHBOARD.NAME),
        },
        {
          to: routes.AGENDA,
          icon: "mdi-calendar-month-outline",
          text: this.$t(i18nConstants.AGENDA.NAME),
        },
        {
          to: routes.SCHEDULES,
          icon: "mdi-calendar-multiple",
          text: this.$tc(i18nConstants.SCHEDULE.NAME, 2),
        },
        {
          to: routes.PRODUCTS,
          icon: "mdi-cube-outline",
          text: this.$tc(i18nConstants.PRODUCT.NAME, 2),
        },
        {
          to: routes.COMBOS,
          icon: "mdi-cards-outline",
          text: this.$tc(i18nConstants.COMBO.NAME, 2),
        },
        {
          to: routes.MATERIALS,
          icon: "mdi-hexagon-slice-1",
          text: this.$tc(i18nConstants.MATERIAL.NAME, 2),
        },
        {
          to: routes.CLIENTS,
          icon: "mdi-account-group-outline",
          text: this.$tc(i18nConstants.CLIENT.NAME, 2),
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["isAuth"]),
  },
  methods: {
    ...mapMutations("auth", ["setShowLogout"]),
    logout() {
      this.setShowLogout(true);
    },
  },
};
</script>
