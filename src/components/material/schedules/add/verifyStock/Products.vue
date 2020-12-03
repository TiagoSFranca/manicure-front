<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        {{ product.product.name }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Material</th>
                <th class="text-left">Qty faltante</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in product.materials"
                :key="`${product.idProduct}_${item.idMaterial}`"
              >
                <td class="text-left">{{ item.material.name }}</td>
                <td class="text-left">{{ item.qty }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: ["product"],
};
</script>
