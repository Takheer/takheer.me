<template>
  <v-container>
    <v-card>
      user:
      {{ user }}
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
  created() {
    console.log(this.$store.getters.currentUser);
  },
};
</script>

<style scoped></style>
