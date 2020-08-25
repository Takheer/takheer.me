import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
    },
    getters: {
      posts(state) {
        return state.posts;
      },
    },
    mutations: {
      setPosts(state, posts) {
        state.posts = posts;
      },
      addPost(state, addedPost) {
        state.posts.push(addedPost);
      },
      editPost({ state }, editedPost) {
        const postIndex = state.posts.findIndex(
          (post) => post.id === editedPost.id
        );
        state.posts[postIndex] = editedPost;
      },
    },
    actions: {
      async nuxtServerInit({ commit }, { app }) {
        const data = await app.$axios.$get("posts.json");
        const posts = [];
        for (const key in data) {
          posts.push({ ...data[key], id: key });
        }
        commit("setPosts", posts);
      },
      addPost({ commit }, post) {
        const createdPost = {
          ...post,
        };
        return (
          this.$axios
            .$post("posts.json", createdPost)
            .then((data) => {
              commit("addPost", { ...createdPost, id: data.name });
              this.$router.push("/posts");
            })
            // eslint-disable-next-line no-console
            .catch((e) => console.log(e))
        );
      },
      editPost({ commit }, post) {},
    },
  });
};

export default createStore;
