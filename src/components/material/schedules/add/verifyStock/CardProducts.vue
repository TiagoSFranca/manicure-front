<template>
  <v-card>
    <v-card-title>
      <span class="overline">PRODUTOS</span>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <products
            v-for="product in products"
            :key="product.idProduct"
            v-bind:product="product"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Products from "./Products.vue";

export default {
  components: { Products },
  props: ["products"],
};
</script>