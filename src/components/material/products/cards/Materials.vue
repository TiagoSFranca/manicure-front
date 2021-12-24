<template>
  <v-card :loading="isLoading">
    <v-card-title class="d-flex align-start">
      <span class="overline">{{ $t(PRODUCT.CARD_MATERIALS.NAME) }}</span>
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
      <span class="overline">
        {{ $t(PRODUCT.CARD_MATERIALS.LABELS.TOTAL) }}:
      </span>

      <span class="overline ml-2">{{ calcTotal() }}</span>
    </div>

    <v-card-text>
      <v-row>
        <v-col
          v-for="material in materials"
          :key="material.id"
          cols="12"
          sm="12"
          md="4"
          lg="3"
        >
          <material-products-material-item
            v-bind:material="material"
            :showActions="isEdit"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <material-products-material-add
      :showAdd="showAdd"
      @close="showAdd = false"
    />
  </v-card>
</template>

<script>
import { ToCurrency } from "@/utils/methods";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      showAdd: false,
    };
  },
  props: ["materials", "isLoading", "isEdit"],
  methods: {
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
  created() {
    this.PRODUCT = i18nConstants.PRODUCT;
  },
};
</script>