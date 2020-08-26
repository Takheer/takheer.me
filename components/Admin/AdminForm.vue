<template>
  <v-form>
    <v-text-field
      v-model="post.title"
      label="Заголовок"
      outlined
    ></v-text-field>
    <v-text-field
      v-model="post.slug"
      label="Текст ссылки"
      outlined
    ></v-text-field>
    <v-text-field
      v-model="post.thumbnail"
      label="Ссылка на фото"
      outlined
    ></v-text-field>
    <v-textarea v-model="post.text" label="Текст" outlined></v-textarea>
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
  props: {
    id: {
      type: String,
      default: "",
    },
    post: {
      type: Object,
      default: () => {
        return {
          title: "",
          text: "",
          slug: "",
          thumbnail: "",
        };
      },
    },
  },
  methods: {
    submit() {
      const postData = {
        title: this.post.title,
        slug: this.post.slug,
        text: this.post.text,
        thumbnail: this.post.thumbnail,
      };
      if (postData.text === "" || postData.title === "") return;
      const method = this.id.length > 0 ? "editPost" : "addPost";
      console.log(method, this.id);
      this.$store.dispatch(method, { ...postData, id: this.id }).then(() => {
        this.$router.push("/posts");
      });
    },
  },
};
</script>

<style scoped></style>
