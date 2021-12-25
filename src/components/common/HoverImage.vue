<template>
  <v-hover v-slot="{ hover }">
    <v-card>
      <v-img
        :src="image.src"
        :lazy-src="lazy ? image.src : ''"
        contain
        width="100%"
        aspect-ratio="1"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-expand-transition>
        <div
          v-if="hover && !disabled"
          class="d-flex v-card--reveal display-3 white--text"
          style="height: 100%"
        >
          <slot />
        </div>
      </v-expand-transition>
    </v-card>
  </v-hover>
</template>

<script>

export default {
  props: ["image", "lazy", "disabled"],
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  background-color: #0000002e;
  position: absolute;
  width: 100%;
}
</style>