<template>
  <v-container>
    <v-card-title class="display-2">{{ post.title }}</v-card-title>
    <v-card-text>{{ post.text }}</v-card-text>
  </v-container>
</template>

<script>
export default {
  name: "Index",
  async asyncData(context) {
    const data = await context.app.$axios.$get(
      "posts/" + context.params.id + ".json"
    );
    return { post: data };
  },
};
</script>

<style scoped></style>
