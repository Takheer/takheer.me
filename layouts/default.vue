<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      permanent
      expand-on-hover
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn v-if="isAuthenticated" color="primary" icon @click="openUserPage">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn v-else color="primary" icon @click="logIn">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app inset>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Blog",
          to: "/posts",
        },
        {
          icon: "mdi-information-outline",
          title: "About",
          to: "/about",
        },
        {
          icon: "mdi-pencil",
          title: "New post",
          to: "/admin/new-post",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Takheer.ru",
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  methods: {
    logIn() {
      this.$router.push("/admin/auth");
    },
    logOut() {
      this.$store.dispatch("logout");
      this.$router.push("/admin/auth");
    },
    openUserPage() {
      this.$router.push("/user/" + this.currentUser.firstName);
    },
  },
};
</script>

<style>
* {
  font-family: "Exo", sans-serif;
}
</style>
