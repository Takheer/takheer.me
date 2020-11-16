import Vuex from "vuex";
import Vue from "vue";
import Cookie from "js-cookie";
import db from "../db/db";
import firebaseConfig from "../db/firebaseConfig";

Vue.use(Vuex);

const createStore = () => {
  return new Vuex.Store({
    state: {
      posts: [],
      token: "",
      email: "",
      expiry: null,
      currentUser: null,
      isCurrentUserLoaded: false,
    },
    getters: {
      posts(state) {
        return state.posts;
      },
      isAuthenticated(state) {
        return state.token.length > 0;
      },
      currentUser(state) {
        return state.currentUser;
      },
    },
    mutations: {
      setPosts(state, posts) {
        state.posts = posts;
      },
      addPost(state, addedPost) {
        state.posts.push(addedPost);
      },
      editPost(state, editedPost) {
        state.posts = [
          ...state.posts.map((post) =>
            post.id !== editedPost.id ? post : { ...post, ...editedPost }
          ),
        ];
      },
      deletePost(state, post) {
        const postIndex = state.posts.findIndex((p) => p.id === post.id);
        state.posts.splice(postIndex, 1);
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = "";
      },
      setCurrentUser(state, user) {
        state.currentUser = user;
      },
      clearCurrentUser(state) {
        state.currentUser = null;
      },
      setIsCurrentUserLoaded(state, flag) {
        state.isCurrentUserLoaded = flag;
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
          .$put("posts/" + post.id + ".json?auth=" + state.token, post)
          .then((data) => {
            commit("editPost", data);
            this.$router.push("/posts");
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.log(e));
      },
      deletePost({ commit, state }, post) {
        this.$axios
          .$delete("posts/" + post.id + ".json?auth=" + state.token)
          .then(() => {
            commit("deletePost", post);
            this.$router.push("/posts");
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.log(e));
      },
      async authenticate({ commit, dispatch, state }, authData) {
        const method = authData.isSignUp ? "signUp" : "signInWithPassword";
        const data = {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        };
        const userData = {
          firstName: authData.firstName,
          lastName: authData.lastName,
          location: authData.location,
          kennel: authData.kennel,
          moderated: false,
        };
        const authResult = await this.$axios.$post(
          "https://identitytoolkit.googleapis.com/v1/accounts:" +
            method +
            "?key=" +
            firebaseConfig.apiKey,
          data
        );
        commit("setToken", authResult.idToken);
        let user;
        if (authData.isSignUp) {
          user = await db
            .collection("users")
            .doc(authResult.email)
            .set(userData);
          commit("setCurrentUser", userData);
        } else {
          user = await db.collection("users").doc(authResult.email).get();
          // eslint-disable-next-line no-console
          commit("setCurrentUser", user.data());
        }
        localStorage.setItem("token", authResult.idToken);
        localStorage.setItem("email", authResult.email);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + +authResult.expiresIn * 1000
        );
        Cookie.set("jwt", authResult.idToken);
        Cookie.set("email", authResult.email);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + +authResult.expiresIn * 1000
        );
        // .catch((e) => {
        //   if (e.message === "EMAIL_EXISTS") {
        //     dispatch("authenticate", { ...authData, isSignUp: false });
        //   }
        //   if (e.message === "EMAIL_NOT_FOUND") {
        //     // ...
        //   }
        // });
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
          dispatch("logout");
          return;
        }
        commit("setToken", token);
      },
      logout({ commit }) {
        commit("clearToken");
        commit("clearCurrentUser");
        Cookie.remove("jwt");
        Cookie.remove("email");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("tokenExpiration");
        }
      },
      async requestCurrentUser({ commit }) {
        commit("setIsCurrentUserLoaded", false);
        const email = Cookie.get("email");
        const user = await db.collection("users").doc(email).get();
        commit("setCurrentUser", user.data());
        commit("setIsCurrentUserLoaded", true);
      },
    },
  });
};

export default createStore;
