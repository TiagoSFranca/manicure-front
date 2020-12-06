<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        {{ isOpen(open) }}
        <span v-if="open" key="0"></span>
        <span v-else key="1" class="overline text-truncate">
          {{ combo.combo.name }}
        </span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card-title>
          <span class="overline text-justify"> {{ combo.combo.name }}</span>
          <v-spacer></v-spacer>
          <v-tooltip bottom v-if="combo.combo.onSale">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="warning" v-bind="attrs" v-on="on">
                mdi-sale
              </v-icon>
            </template>
            <span>Em promoção</span>
          </v-tooltip>
        </v-card-title>
        <v-card-text>
          <v-row align="center" justify="space-between">
            <v-col cols="12" class="text-left">
              <span class="overline">Quantidade:</span>
              <span class="ml-2 caption">{{ combo.qty }}</span>
            </v-col>
            <v-col cols="12" class="text-left pt-0">
              <span class="overline">Valor atual:</span>
              <span class="ml-2 caption">{{
                toCurrency(
                  combo.combo.onSale
                    ? combo.combo.promotionalPrice
                    : combo.combo.price
                )
              }}</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark icon @click="seeCombo(combo.combo)">
            <v-icon>mdi-eye-outline</v-icon>
          </v-btn>
          <v-btn dark icon color="error" @click="deleteItem(combo.combo.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { ToCurrency } from "@/utils/methods";
import { COMBOS_DETAILS } from "@/router/routes";

export default {
  props: ["combo"],
  data() {
    return {};
  },
  methods: {
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    deleteItem(id) {
      this.$emit("delete", id);
    },
    isOpen(open) {
      if (!open) this.isEdit = false;
    },
    seeCombo(combo) {
      let routeData = this.$router.resolve({
        path: COMBOS_DETAILS.replace(":id", combo.id),
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>