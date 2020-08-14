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
    },
    actions: {
      async nuxtServerInit({ commit, state }) {
        const result = await axios.get(
          "https://takheer-the-blog.firebaseio.com/posts.json"
        );
        commit("setPosts", Object.values(result.data));
      },
    },
  });
};

export default createStore;
