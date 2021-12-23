<template v-if="noConnection">
  <v-dialog v-model="noConnection" max-width="500" persistent>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12 mt-0 pt-0">
            <lottie-player
              src="https://assets6.lottiefiles.com/datafiles/HF2l8DiOyOT4dwI/data.json"
              background="transparent"
              speed="1"
              style="height: 280px"
              loop
              autoplay
            ></lottie-player>
          </v-col>
          <v-col cols="12">
            <span class="overline text-h5 white--text">
              <strong>{{ $t(GENERAL.MESSAGES.NO_CONNECTION.TITLE) }}</strong>
            </span>
          </v-col>
          <v-col cols="12 mb-0 pb-0">
            <span class="overline">
              {{ $t(GENERAL.MESSAGES.NO_CONNECTION.FIRST_MESSAGE) }}
            </span>
          </v-col>
          <v-col cols="12 mt-0 pt-0">
            <span class="overline">
              {{ $t(GENERAL.MESSAGES.NO_CONNECTION.SECOND_MESSAGE) }}
            </span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          outlined
          color="primary"
          :to="INDEX"
          exact
          v-if="checkRoute()"
          @click="closeModal"
        >
          <v-icon left>mdi-arrow-left</v-icon>
          {{ $t(GENERAL.MESSAGES.NO_CONNECTION.COME_BACK) }}
        </v-btn>
        <v-spacer />
        <v-btn outlined color="error" @click="closeModal">
          {{ $t(GENERAL.MESSAGES.NO_CONNECTION.CLOSE) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import appConstants from "@/store/modules/app/constants";
import { mapState } from "vuex";
import { INDEX } from "@/router/routes";
import { setNoConnection } from "@/actions/appActions";
import i18nConstants from "@/i18n/constants";

export default {
  data() {
    return {
      INDEX: INDEX,
    };
  },
  computed: {
    ...mapState(appConstants.MODULE_NAME, ["noConnection"]),
  },
  methods: {
    closeModal() {
      setNoConnection(false);
    },
    checkRoute() {
      return this.$route.name != INDEX.name;
    },
  },
  created() {
    this.GENERAL = i18nConstants.GENERAL;
  },
};
</script>
