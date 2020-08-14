<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card class="mt-5">
        <v-card-title class="headline">
          Takheer.ru
        </v-card-title>
        <v-card-text>
          <p>
            Блог обо всём, что интересно его автору: программирование, дизайн,
            архитектура, путешествия, фотография, собаки и прочий лайфстайл
          </p>

          <hr class="my-3" />
          <div class="d-flex flex-row justify-space-between">
            <a
              href="https://twitter.com/takheer228"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
            >
              Twitter
            </a>
            <a
              href="https://vk.com/takheer228"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
            >
              VK
            </a>
            <a
              href="https://github.com/takheer"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
            >
              GitHub
            </a>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/posts">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped lang="scss">
.link {
  color: #2d80d5;
  transition: color ease 0.2s;
  &:hover {
    color: white;
  }
}
</style>
