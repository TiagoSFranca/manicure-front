<template>
  <v-card :loading="loading" :disabled="disabled">
    <v-card-title class="d-flex align-start">
      <span class="overline">combos</span>
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
      <span class="overline">Soma dos combos:</span>

      <span class="overline ml-2">{{ toCurrency(calcTotal()) }}</span>
    </div>

    <v-card-text>
      <v-container>
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
      </v-container>
    </v-card-text>
    <material-schedules-add-combo-add
      :showAdd="showAdd"
      @fechar="showAdd = false"
      @addCombo="addCombo"
    />
  </v-card>
</template>

<script>
import combosActions from "@/actions/combosActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { ToCurrency } from "@/utils/methods";
import toastr from "@/utils/toastr";

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
      else toastr.error("Este combo já foi adicionado");
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
};
</script>