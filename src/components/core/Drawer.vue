<template>
  <v-navigation-drawer
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :expand-on-hover="$vuetify.breakpoint.mdAndUp"
    :mini-variant="$vuetify.breakpoint.smAndDown"
    app
    color="primary"
    class="deep-purple accent-4"
    mini-variant-width="60"
    v-model="showDrawer"
    clipped
  >
    <v-list nav class="pa-0">
      <v-list-item
        v-for="item in links"
        :key="item.text"
        :to="item.to"
        link
        class="my-0"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="text-left">
            {{ item.text }}
          </v-list-item-title>
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
import appConstants from "@/store/modules/app/constants";

export default {
  data() {
    return {
      mini: true,
      showDrawer: true,
      links: [
        {
          to: routes.INDEX,
          icon: routes.INDEX.icon,
          text: this.$t(i18nConstants.INDEX.NAME),
        },
        {
          to: routes.DASHBOARD,
          icon: routes.DASHBOARD.icon,
          text: this.$t(i18nConstants.DASHBOARD.NAME),
        },
        {
          to: routes.AGENDA,
          icon: routes.AGENDA.icon,
          text: this.$t(i18nConstants.AGENDA.NAME),
        },
        {
          to: routes.SCHEDULES,
          icon: routes.SCHEDULES.icon,
          text: this.$tc(i18nConstants.SCHEDULE.NAME, 2),
        },
        {
          to: routes.PRODUCTS,
          icon: routes.PRODUCTS.icon,
          text: this.$tc(i18nConstants.PRODUCT.NAME, 2),
        },
        {
          to: routes.COMBOS,
          icon: routes.COMBOS.icon,
          text: this.$tc(i18nConstants.COMBO.NAME, 2),
        },
        {
          to: routes.MATERIALS,
          icon: routes.MATERIALS.icon,
          text: this.$tc(i18nConstants.MATERIAL.NAME, 2),
        },
        {
          to: routes.CLIENTS,
          icon: routes.CLIENTS.icon,
          text: this.$tc(i18nConstants.CLIENT.NAME, 2),
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["isAuth"]),
    ...mapState(appConstants.MODULE_NAME, ["drawer"]),
  },
  methods: {
    ...mapMutations("auth", ["setShowLogout"]),
    ...mapMutations(appConstants.MODULE_NAME, [
      appConstants.MUTATION_TOGGLE_DRAWER,
    ]),
    logout() {
      this.setShowLogout(true);
    },
  },
  watch: {
    drawer() {
      this.showDrawer =
        this.drawer == this.showDrawer ? !this.drawer : this.drawer;
    },
  },
};
</script>
