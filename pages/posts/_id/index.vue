<template>
  <v-container>
    <v-card>
      <v-card-title class="display-1">{{ post.title }}</v-card-title>
      <v-card-text>
        <p v-for="paragraph of post.text" :key="paragraph" class="post-body">
          {{ paragraph }}
        </p>
        <p>
          <nuxt-link :to="{ path: `/user/${post.authorId}` }">
            {{ post.authorId }}
          </nuxt-link>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Index",
  async asyncData(context) {
    const data = await context.app.$axios.$get(
      "posts/" + context.params.id + ".json"
    );
    data.text = data.text.split("\n\n");
    return { post: data };
  },
};
</script>

<style scoped>
.post-body {
  font-size: 20px !important;
}
</style>
