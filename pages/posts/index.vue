<template>
  <v-container>
    <v-row>
      <v-col v-for="post in posts" :key="post.id" lg="6">
        <nuxt-link :to="'posts/' + post.id">
          <v-card class="post-card d-flex ma-4" rounded>
            <div class="d-flex flex-column w-100">
              <div v-if="isAuthenticated" class="d-flex flex-row pa-3">
                <v-spacer />
                <v-btn icon>
                  <nuxt-link :to="/admin/ + post.id">
                    <v-icon>mdi-pencil</v-icon>
                  </nuxt-link>
                </v-btn>
                <v-btn icon @click="deletePost(post)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </div>
              <v-spacer />
              <div class="pa-4 text-center mt-auto mx-auto">
                <h2 class="grey--text text--lighten-2">
                  {{ post.title }}
                </h2>
              </div>
            </div>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";
import { mapActions } from "vuex";
export default {
  name: "Index",
  middleware: "log",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    posts() {
      const posts = _.cloneDeep(this.$store.getters.posts);
      posts.reverse();
      return posts;
    },
  },
  methods: {
    ...mapActions({
      deletePost: "deletePost",
    }),
    editPost(post) {
      this.$router.push("/admin/" + post.id);
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
.w-100 {
  width: 100% !important;
}
a {
  text-decoration: none !important;
}
</style>
