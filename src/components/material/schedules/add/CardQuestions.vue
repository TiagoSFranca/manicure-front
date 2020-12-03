<template>
  <v-card :loading="loading" :disabled="disabled">
    <v-card-title>
      <span class="overline">Estética da Unha</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row class="text-left" no-gutters>
          <v-col cols="12" md="6" lg="6">
            <v-radio-group
              v-model="questions.format"
              row
              label="Formato de Preferência:"
            >
              <v-radio label="Nenhum" value="n" />
              <v-radio label="Redondo" value="r" />
              <v-radio label="Quadrado" value="q" />
              <v-radio label="Ovalado" value="o" />
              <v-radio label="Pontudo" value="p" />
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <v-radio-group
              v-model="questions.color"
              row
              label="Tonalidade de Preferência:"
            >
              <v-radio label="Nenhuma" value="n" />
              <v-radio label="Claro" value="c" />
              <v-radio label="Escuro" value="e" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row class="text-left" align="center">
          <v-col cols="12" md="6" lg="6">
            <v-checkbox
              v-model="questions.hasOnychomycosis"
              label="Já teve ou tem algum tipo de onicomicose(micoses, fungos,etc)"
            />
            <v-checkbox
              class="d-flex"
              v-model="questions.useOnychomycosisMedicine"
              label="Faz uso de algum medicamento específico para onicomicose"
            />
            <validation-provider rules="max:512" v-slot="{ errors }">
              <v-textarea
                label="Qual medicamento? Quem Indicou?"
                v-model="questions.onychomycosisMedicine"
                :error-messages="errors"
                counter="512"
                :disabled="!questions.useOnychomycosisMedicine"
              ></v-textarea>
            </validation-provider>
          </v-col>
          <v-col cols="12" md="6" lg="6">
            <v-checkbox v-model="questions.diabetes" label="Diabetes" />
            <v-checkbox v-model="questions.allergy" label="Alergia" />
            <validation-provider rules="max:512" v-slot="{ errors }">
              <v-textarea
                label="Qual medicamento?"
                v-model="questions.allergyMedicine"
                :error-messages="errors"
                counter="512"
                :disabled="!questions.allergy"
              ></v-textarea>
            </validation-provider>
          </v-col>
        </v-row>
        <v-row class="text-left" align="center">
          <v-col cols="12" lg="6" md="6">
            <validation-provider rules="max:512" v-slot="{ errors }">
              <v-textarea
                label="Medicamento Anticoagulante"
                v-model="questions.anticoagulantMedication"
                :error-messages="errors"
                counter="512"
              ></v-textarea>
            </validation-provider>
          </v-col>
          <v-col cols="12" lg="6" md="6">
            <validation-provider rules="max:512" v-slot="{ errors }">
              <v-textarea
                label="Observações"
                v-model="questions.comments"
                :error-messages="errors"
                counter="512"
              ></v-textarea>
            </validation-provider>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["loading", "disabled", "questions"],
};
</script>
