<template>
  <v-card :loading="loading" :disabled="disabled">
    <v-card-title class="d-flex align-start">
      <span class="overline">
        {{ $t(SCHEDULE.CARD_MATERIALS.NAME) }}
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
        v-if="!readonly"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{ $t(SCHEDULE.CARD_MATERIALS.LABELS.MATERIAL) }}
                  </th>
                  <th class="text-center">
                    {{ $t(SCHEDULE.CARD_MATERIALS.LABELS.RESERVED_QTY) }}
                  </th>
                  <th class="text-center" width="25%">
                    {{ $t(SCHEDULE.CARD_MATERIALS.LABELS.USED_QTY) }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in materials" :key="item.name">
                  <td class="text-left">{{ item.material.name }}</td>
                  <td>{{ item.qtyReserved }}</td>
                  <td v-if="readonly">{{ item.qtyUsed }}</td>
                  <td v-else>
                    <validation-provider
                      rules="required|greater_than_or_equal:0"
                      v-slot="{ errors }"
                    >
                      <v-currency-field
                        v-model="item.qtyUsed"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card-text>
    <material-schedules-material-add
      :showAdd="showAdd"
      @close="showAdd = false"
      @addMaterial="addMaterial"
    />
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import appConstants from "@/store/modules/app/constants";
import toastr from "@/utils/toastr";
import i18nConstants from "@/i18n/constants";

export default {
  props: ["loading", "disabled", "materials", "readonly"],
  data() {
    return {
      showAdd: false,
    };
  },
  methods: {
    addMaterial(object) {
      let keep =
        this.materials.filter((e) => e.material.id == object.material.id)
          .length > 0;
      this.showAdd = keep;
      if (!keep) this.materials.push(object);
      else
        toastr.error(
          this.$t(this.SCHEDULE.CARD_MATERIALS.MESSAGES.CAN_NOT_ADD)
        );
    },
  },
  watch: {
    materials() {
      this.$emit("changeMaterials", this.materials);
    },
  },
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>