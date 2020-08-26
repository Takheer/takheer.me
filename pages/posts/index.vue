<template>
  <v-container>
    <v-row>
      <v-col v-for="post in posts" :key="post.id" lg="6">
        <nuxt-link :to="'posts/' + post.id">
          <v-card class="post-card d-flex" rounded>
            <div class="pa-4 text-center mt-auto mx-auto">
              <h2 class="grey--text text--lighten-2">
                {{ post.title }}
              </h2>
            </div>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";
export default {
  name: "Index",
  middleware: "log",
  computed: {
    posts() {
      const posts = _.cloneDeep(this.$store.getters.posts);
      posts.reverse();
      return posts;
    },
  },
};
</script>

<style scoped lang="scss">
.post-card {
  height: 400px;
  cursor: pointer;
  transition: transform ease-in-out 0.2s;
  &:hover {
    transform: scale(1.02);
  }
}
</style>
