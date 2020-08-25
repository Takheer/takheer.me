<template>
  <v-form>
    <v-text-field v-model="title" label="Заголовок" outlined></v-text-field>
    <v-text-field v-model="slug" label="Текст ссылки" outlined></v-text-field>
    <v-text-field
      v-model="thumbnail"
      label="Ссылка на фото"
      outlined
    ></v-text-field>
    <v-textarea v-model="text" label="Текст" outlined></v-textarea>
    <div class="d-flex">
      <v-btn class="mx-auto mb-3" color="primary" @click="submit()"
        >Отправить</v-btn
      >
    </div>
  </v-form>
</template>

<script>
export default {
  name: "AdminForm",
  data() {
    return {
      title: "",
      text: "",
      slug: "",
      thumbnail: "",
    };
  },
  methods: {
    submit() {
      const postData = {
        title: this.title,
        slug: this.slug,
        text: this.text,
        thumbnail: this.thumbnail,
      };
      if (postData.text === "" || postData.title === "") return;
      this.$store.dispatch("addPost", postData).then(() => {
        this.$router.push("/posts");
      });
    },
  },
};
</script>

<style scoped></style>
