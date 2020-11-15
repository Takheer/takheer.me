<template>
  <v-container>
    <v-card>
      <v-row class="px-8 py-5" align-content="baseline">
        <v-avatar color="primary" size="200"></v-avatar>
        <v-col class="pa-0">
          <v-card-title class="pt-0 name-header">
            {{ user.firstName }} {{ user.lastName }}
          </v-card-title>
          <v-card-subtitle class="sub-header">
            <v-icon>mdi-map-marker</v-icon>
            {{ user.location }}
          </v-card-subtitle>
          <v-card-subtitle class="sub-header">
            {{ user.kennel }}
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Index",
  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
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
