import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

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
      async nuxtServerInit({ commit }) {
        const result = await axios.get(
          "https://takheer-the-blog.firebaseio.com/posts.json"
        );
        const posts = [];
        for (const key in result.data) {
          posts.push({ ...result.data[key], id: key });
        }
        commit("setPosts", posts);
      },
      addPost({ commit }, post) {
        const createdPost = {
          ...post,
        };
        return (
          axios
            .post(
              "https://takheer-the-blog.firebaseio.com/posts.json",
              createdPost
            )
            .then((result) => {
              commit("addPost", { ...createdPost, id: result.data.name });
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
