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
            {{ user.firstName }} {{ user.lastName }}
          </nuxt-link>
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import db from "../../../db/db";

export default {
  name: "Index",
  async asyncData(context) {
    const post = await context.app.$axios.$get(
      "posts/" + context.params.id + ".json"
    );
    post.text = post.text.split("\n\n");

    const userRaw = await db.collection("users").doc(post.authorId).get();
    return { post, user: userRaw.data() };
  },
};
</script>

<style scoped>
.post-body {
  font-size: 20px !important;
}
</style>
