<template>
  <v-card :loading="loading" :disabled="disabled">
    <v-card-title class="d-flex align-start">
      <span class="overline">
        {{ $t(SCHEDULE.ADD.CARD_COMBOS.NAME) }}
      </span>
      <v-spacer></v-spacer>
      <v-btn
        color="accent"
        outlined
        rounded
        dark
        small
        icon
        @click="showAdd = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>

    <div v-if="combos.length > 0">
      <span class="overline">
        {{ $t(SCHEDULE.ADD.CARD_COMBOS.LABELS.TOTAL) }}:
      </span>
      <span class="overline ml-2">{{ toCurrency(calcTotal()) }}</span>
    </div>

    <v-card-text>
      <v-row>
        <v-col
          v-for="combo in combos"
          :key="combo.combo.id"
          cols="12"
          sm="12"
          md="12"
          lg="12"
        >
          <material-schedules-add-combo-item
            v-bind:combo="combo"
            @delete="removeCombo"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <material-schedules-add-combo-add
      :showAdd="showAdd"
      @close="showAdd = false"
      @addCombo="addCombo"
    />
  </v-card>
</template>

<script>
import { ToCurrency } from "@/utils/methods";
import toastr from "@/utils/toastr";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["loading", "disabled"],
  data() {
    return {
      showAdd: false,
      combos: [],
    };
  },
  methods: {
    getCurrPrice(combo) {
      return combo.onSale ? combo.promotionalPrice : combo.price;
    },
    calcTotal() {
      if (this.combos.length == 0) return 0;

      let p = this.combos.map((cur) => {
        return cur.qty * this.getCurrPrice(cur.combo);
      });

      return p.reduce((acc, cur) => acc + cur);
    },
    toCurrency(value) {
      return ToCurrency(value, true, false);
    },
    addCombo(object) {
      let keep =
        this.combos.filter((e) => e.combo.id == object.combo.id).length > 0;
      this.showAdd = keep;
      if (!keep) this.combos.push(object);
      else
        toastr.error(
          this.$t(this.SCHEDULE.ADD.CARD_COMBOS.MESSAGES.CAN_NOT_ADD)
        );
    },
    removeCombo(id) {
      let items = this.combos.filter((e) => e.combo.id != id);
      this.combos = items;
    },
  },
  watch: {
    combos() {
      this.$emit("changeCombos", this.combos);
    },
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>