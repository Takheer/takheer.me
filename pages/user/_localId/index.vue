<template>
  <v-container>
    <v-card class="d-flex pa-5">
      <v-progress-circular
        v-if="!isCurrentUserLoaded"
        class="ma-auto"
        indeterminate
      />
      <v-row v-else class="px-3" align-content="center">
        <v-avatar color="primary" size="200"></v-avatar>
        <v-col class="pa-0">
          <v-card-title class="pt-0 name-header">
            {{ firstName }} {{ lastName }}
          </v-card-title>
          <v-card-subtitle class="sub-header">
            <v-icon>mdi-map-marker</v-icon>
            {{ location }}
          </v-card-subtitle>
          <v-card-subtitle class="sub-header">
            {{ kennel }}
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Index",
  computed: {
    ...mapState(["isCurrentUserLoaded"]),
    user() {
      return this.$store.getters.currentUser;
    },
    firstName() {
      return this.user ? this.user.firstName : "";
    },
    lastName() {
      return this.user ? this.user.lastName : "";
    },
    location() {
      return this.user ? this.user.location : "";
    },
    kennel() {
      return this.user ? this.user.kennel : "";
    },
  },
  created() {
    console.log(this.$route);
    if (this.$route.params.localId) {
      this.requestUser(this.$route.params.localId);
    } else {
      this.requestCurrentUser();
    }
  },
  methods: {
    ...mapActions(["requestCurrentUser", "requestUser"]),
  },
};
</script>

<style scoped lang="scss">
.name-header {
  font-size: 28px !important;
}
.sub-header {
  font-size: 20px !important;
}
</style>
