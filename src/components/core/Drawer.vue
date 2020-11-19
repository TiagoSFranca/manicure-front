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
          <v-list-item-title>{{ item.text }}</v-list-item-title>
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
export default {
  data() {
    return {
      mini: true,
      links: [
        {
          to: routes.DASHBOARD,
          icon: "mdi-view-dashboard",
          text: "Dashboard",
        },
        {
          to: routes.PRODUCTS,
          icon: "mdi-cube-outline",
          text: "Produtos",
        },
        {
          to: routes.COMBOS,
          icon: "mdi-cards-outline",
          text: "Combos",
        },
        {
          to: routes.MATERIALS,
          icon: "mdi-hexagon-slice-1",
          text: "Materiais",
        },
        {
          to: routes.AGENDA,
          icon: "mdi-calendar-month-outline",
          text: "Agenda",
        },
        {
          to: routes.CUSTOMERS,
          icon: "mdi-account-group-outline",
          text: "Clientes",
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
