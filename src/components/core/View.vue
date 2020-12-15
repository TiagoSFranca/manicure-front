<template>
  <v-main>
    <v-container fluid grid-list-xl>
      <v-layout wrap>
        <v-flex>
          <router-view />
        </v-flex>
      </v-layout>
      <!-- <v-footer dark padless >
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} - <strong>manicure</strong>
      </v-col>
    </v-footer> -->
    </v-container>
    <core-toastr />
    <core-progress-bar />
    <core-logout />
  </v-main>
</template>
