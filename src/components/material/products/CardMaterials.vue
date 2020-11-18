<template>
  <div>
    <v-card
      :loading="isLoading"
      :height="height"
      :class="`${height ? 'd-flex flex-column' : ''}`"
    >
      <v-card-title class="d-flex align-start">
        <span class="overline">materiais</span>
        <v-spacer></v-spacer>
        <v-btn
          v-if="isEdit"
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

      <div v-if="materials.length > 0">
        <span class="overline">Total:</span>

        <span class="overline ml-2">{{ calcTotal() }}</span>
      </div>

      <v-card-text>
        <v-container>
          <material-products-material-list
            :materials="materials"
            :isEdit="isEdit"
          />
        </v-container>
      </v-card-text>
    </v-card>
    <material-products-material-add
      :showAdd="showAdd"
      @fechar="showAdd = false"
    />
  </div>
</template>

<script>
import productsActions from "@/actions/productsActions";
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import { ToCurrency } from "@/utils/methods";

export default {
  data() {
    return {
      showAdd: false,
    };
  },
  props: ["materials", "isLoading", "isEdit", "height"],
  methods: {
    seeCombo(material) {
      this.$router.push({ path: "/GOOGLE".replace(":id", material.id) });
    },
    calcTotal() {
      let p = this.materials.map((cur) => {
        return cur.qty * cur.material.price;
      });

      return ToCurrency(
        p.reduce((acc, cur) => acc + cur),
        true,
        false
      );
    },
  },
};
</script>