<template>
  <v-container>
    <v-card>
      <v-row class="px-8 py-5" align-content="center">
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
import { mapActions } from "vuex";
export default {
  name: "Index",
  computed: {
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
    this.requestCurrentUser();
  },
  methods: {
    ...mapActions(["requestCurrentUser"]),
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
