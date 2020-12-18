<template>
  <v-card :loading="loading" :disabled="disabled">
    <v-card-title>
      <span class="overline">{{ $t(SCHEDULE.CARD_QUESTIONS.NAME) }}</span>
    </v-card-title>
    <v-card-text>
      <v-row class="text-left" no-gutters>
        <v-col cols="12" md="6" lg="6">
          <v-radio-group
            v-model="questions.format"
            row
            :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT)"
            :readonly="readonly"
          >
            <v-radio
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.NONE)"
              value="n"
            />
            <v-radio
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.ROUND)"
              value="r"
            />
            <v-radio
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.SQUARE)"
              value="q"
            />
            <v-radio
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.OVAL)"
              value="o"
            />
            <v-radio
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.POINTED)"
              value="p"
            />
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-radio-group
            v-model="questions.color"
            row
            :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.COLOR)"
            :readonly="readonly"
          >
            <v-radio
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.COLOR_OPTIONS.NONE)"
              value="n"
            />
            <v-radio
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.COLOR_OPTIONS.BRIGHT)"
              value="c"
            />
            <v-radio
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.COLOR_OPTIONS.DARK)"
              value="e"
            />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row class="text-left" align="center">
        <v-col cols="12" md="6" lg="6">
          <v-checkbox
            v-model="questions.hasOnychomycosis"
            :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.HAS_ONYCHOMYCOSIS)"
            :readonly="readonly"
          />
          <v-checkbox
            class="d-flex"
            v-model="questions.useOnychomycosisMedicine"
            :label="
              $t(SCHEDULE.CARD_QUESTIONS.LABELS.USE_ONYCHOMYCOSIS_MEDICINE)
            "
            :readonly="readonly"
          />
          <validation-provider rules="max:512" v-slot="{ errors }">
            <v-textarea
              v-model="questions.onychomycosisMedicine"
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.ONYCHOMYCOSIS_MEDICINE)"
              :error-messages="errors"
              counter="512"
              :disabled="!questions.useOnychomycosisMedicine"
              :readonly="readonly"
            ></v-textarea>
          </validation-provider>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <v-checkbox
            v-model="questions.diabetes"
            :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.DIABETES)"
            :readonly="readonly"
          />
          <v-checkbox
            v-model="questions.allergy"
            :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.ALLERGY)"
            :readonly="readonly"
          />
          <validation-provider rules="max:512" v-slot="{ errors }">
            <v-textarea
              v-model="questions.allergyMedicine"
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.ALLERGY_MEDICINE)"
              :error-messages="errors"
              counter="512"
              :disabled="!questions.allergy"
              :readonly="readonly"
            ></v-textarea>
          </validation-provider>
        </v-col>
      </v-row>
      <v-row class="text-left" align="center">
        <v-col cols="12" lg="6" md="6">
          <validation-provider rules="max:512" v-slot="{ errors }">
            <v-textarea
              v-model="questions.anticoagulantMedication"
              :label="
                $t(SCHEDULE.CARD_QUESTIONS.LABELS.ANTICOAGULANT_MEDICATION)
              "
              :error-messages="errors"
              counter="512"
              :readonly="readonly"
            ></v-textarea>
          </validation-provider>
        </v-col>
        <v-col cols="12" lg="6" md="6">
          <validation-provider rules="max:512" v-slot="{ errors }">
            <v-textarea
              v-model="questions.comments"
              :label="$t(SCHEDULE.CARD_QUESTIONS.LABELS.COMMENTS)"
              :error-messages="errors"
              counter="512"
              :readonly="readonly"
            ></v-textarea>
          </validation-provider>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import i18nConstants from "@/i18n/constants";

export default {
  props: ["loading", "disabled", "questions", "readonly"],
  created() {
    this.SCHEDULE = i18nConstants.SCHEDULE;
  },
};
</script>
