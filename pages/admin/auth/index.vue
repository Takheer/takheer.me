<template>
  <v-card class="pa-5">
    <v-card-title v-if="isSignUpMode">Create an account</v-card-title>
    <v-card-title v-else>Sign in</v-card-title>
    <v-form>
      <v-text-field
        v-model="email"
        outlined
        type="email"
        label="e-mail"
      ></v-text-field>
      <v-text-field
        v-model="password"
        outlined
        type="password"
        label="password"
      ></v-text-field>
      <div class="d-flex flex-row">
        <v-btn @click="authenticate(isSignUpMode)">
          <template v-if="isSignUpMode">
            sign up
          </template>
          <template v-else>
            sign in
          </template>
        </v-btn>
        <v-alert v-if="errorMessage.length > 0" outlined>{{
          errorMessage
        }}</v-alert>
      </div>
      <v-card-text>
        <small v-if="isSignUpMode">
          Do you have an account already?
          <a @click="isSignUpMode = false">Sign in it</a>
        </small>
        <small v-else>
          Don't have an account yet?
          <a @click="isSignUpMode = true">Create one for free!</a>
        </small>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      errorMessage: "",
      email: "",
      password: "",
      isSignUpMode: false,
    };
  },
  methods: {
    authenticate(isSignUp) {
      this.$store
        .dispatch("authenticate", {
          email: this.email,
          password: this.password,
          isSignUp,
        })
        .then(() => {
          this.$router.push("/posts");
        });
    },
  },
};
</script>

<style scoped></style>
