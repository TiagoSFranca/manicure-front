<template>
  <v-row justify="center">
    <v-dialog v-model="visible" scrollable persistent max-width="800px">
      <v-card>
        <v-card-title> </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-text-field
                :label="$t(MATERIAL.STOCK_INFO.LABELS.DATE)"
                :value="formatDate(materialStock.createdAt)"
                readonly
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                :label="$t(MATERIAL.STOCK_INFO.LABELS.TYPE)"
                v-model="materialStock.materialStockType.description"
                readonly
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                :label="$t(MATERIAL.STOCK_INFO.LABELS.QTY)"
                v-model="materialStock.qty"
                readonly
              />
            </v-col>
          </v-row>
          <v-row v-if="materialStock.idSchedule != null" justify="end">
            <v-col cols="auto">
              <v-btn
                color="warning"
                text
                outlined
                small
                target="_blank"
                :to="{
                  name: SCHEDULES_DETAILS.name,
                  params: { id: materialStock.idSchedule },
                }"
              >
                {{ $tc(SCHEDULE.NAME, 1) }}
                <v-icon right>mdi-open-in-new</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                :label="$t(MATERIAL.STOCK_INFO.LABELS.COMMENTS)"
                v-model="materialStock.comments"
                readonly
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="hide()" icon fab>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import i18nConstants from "@/i18n/constants";
import { formatDate } from "@/utils/methods";
import { SCHEDULES_DETAILS } from "@/router/routes";

export default {
  props: ["showInfo", "materialStock"],
  data() {
    return {
      visible: false,
      formatDate: formatDate,
      SCHEDULES_DETAILS: SCHEDULES_DETAILS,
    };
  },
  methods: {
    hide() {
      this.$emit("close");
      this.visible = false;
    },
    show() {
      this.visible = true;
    },
  },
  watch: {
    showInfo() {
      if (this.showInfo && !this.visible) this.show();
      else if (!this.showInfo && this.visible) this.hide();
    },
  },
  created() {
    this.MATERIAL = i18nConstants.MATERIAL;
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>