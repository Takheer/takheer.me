import Vuex from "vuex";
import Vue from "vue";
import Cookie from "js-cookie";

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      token: "",
      expiry: null,
    },
    getters: {
      posts(state) {
        return state.posts;
      },
      isAuthenticated(state) {
        return state.token.length > 0;
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
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = "";
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
      addPost({ commit, state }, post) {
        const createdPost = {
          ...post,
        };
        return (
          this.$axios
            .$post("posts.json?auth=" + state.token, createdPost)
            .then((data) => {
              commit("addPost", { ...createdPost, id: data.name });
              this.$router.push("/posts");
            })
            // eslint-disable-next-line no-console
            .catch((e) => console.log(e))
        );
      },
      editPost({ commit, state }, post) {
        this.$axios
          .$put("posts/", post.id + ".json?auth=" + state.token)
          .then(() => {
            commit("editPost", post);
            this.$router.push("/posts/" + post.id);
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.log(e));
      },
      authenticate({ commit, dispatch, state }, authData) {
        const method = authData.isSignUp ? "signUp" : "signInWithPassword";
        return this.$axios
          .$post(
            "https://identitytoolkit.googleapis.com/v1/accounts:" +
              method +
              "?key=" +
              process.env.firebaseConfig.apiKey,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .then((result) => {
            commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + +result.expiresIn * 1000
            );
            Cookie.set("jwt", result.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + +result.expiresIn * 1000
            );
            dispatch("setLogoutTimer", result.expiresIn * 1000);
          })
          .catch((e) => {
            if (e.message === "EMAIL_EXISTS") {
              dispatch("authenticate", { ...authData, isSignUp: false });
            }
            if (e.message === "EMAIL_NOT_FOUND") {
              // ...
            }
          });
      },
      initAuth({ commit, dispatch }, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const cookies = req.headers.cookie.split(";");
          const jwtCookie = cookies.find((c) => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = cookies.find((c) =>
            c.trim().startsWith("expirationDate=")
          ).split[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          commit("clearToken");
          dispatch("logout");
          return;
        }
        commit("setToken", token);
      },
      logout({ commit }) {
        commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      },
    },
  });
};

export default createStore;
