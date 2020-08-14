<template>
  <v-container>
    <v-card-title class="display-2">{{ post.title }}</v-card-title>
    <v-card-text>{{ post.text }}</v-card-text>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  async asyncData(context) {
    const { data } = await axios.get(
      "https://takheer-the-blog.firebaseio.com/posts/" +
        context.params.id +
        ".json"
    );
    return { post: data };
  },
};
</script>

<style scoped></style>
