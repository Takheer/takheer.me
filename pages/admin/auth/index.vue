<template>
  <v-card class="pa-5">
    <v-card-title v-if="isSignUpMode">Создайте аккаунт</v-card-title>
    <v-card-title v-else>Войдите в свой аккаунт</v-card-title>
    <v-form>
      <v-text-field v-model="email" outlined type="email" label="e-mail" />
      <v-text-field
        v-model="password"
        outlined
        type="password"
        label="Пароль"
      />
      <template v-if="isSignUpMode">
        <v-text-field v-model="firstName" outlined label="Имя" />
        <v-text-field v-model="lastName" outlined label="Фамилия" />
        <v-text-field v-model="location" outlined label="Откуда вы" />
        <v-text-field v-model="kennel" outlined label="Питомник" />
      </template>
      <div class="d-flex flex-row">
        <v-btn @click="authenticate(isSignUpMode)">
          <template v-if="isSignUpMode">
            Создать
          </template>
          <template v-else>
            Войти
          </template>
        </v-btn>
        <v-alert v-if="errorMessage.length > 0" outlined>{{
          errorMessage
        }}</v-alert>
      </div>
      <v-card-text>
        <small v-if="isSignUpMode">
          Уже есть аккаунт?
          <a @click="isSignUpMode = false">Войдите</a>
        </small>
        <small v-else>
          Ещё нет аккаунта?
          <a @click="isSignUpMode = true">Зарегистрируйтесь</a>
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
      firstName: "",
      lastName: "",
      location: "",
      kennel: "",
      isSignUpMode: false,
    };
  },
  methods: {
    authenticate(isSignUp) {
      this.$store
        .dispatch("authenticate", {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          location: this.location,
          kennel: this.kennel,
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
