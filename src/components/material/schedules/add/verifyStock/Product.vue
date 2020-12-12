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
                <th class="text-left">
                  {{ $t(SCHEDULE.ADD.VERIFY_STOCK.PRODUCT.LABELS.MATERIAL) }}
                </th>
                <th class="text-left">
                  {{ $t(SCHEDULE.ADD.VERIFY_STOCK.PRODUCT.LABELS.QTY) }}
                </th>
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
import i18nConstants from "@/i18n/constants";

export default {
  props: ["product"],
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>
