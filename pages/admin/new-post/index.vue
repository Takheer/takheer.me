<template>
  <v-card class="pa-5">
    <v-form>
      <v-text-field v-model="title" label="Заголовок" outlined></v-text-field>
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
  </v-card>
</template>
<script>
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      title: "",
      text: "",
      thumbnail: "",
    };
  },
  methods: {
    submit() {
      const postData = {
        title: this.title,
        text: this.text,
        thumbnail: this.thumbnail,
      };
      if (postData.text === "" || postData.title === "") return;
      axios
        .post("https://takheer-the-blog.firebaseio.com/posts.json", postData)
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log(result);
          this.$router.push("/posts");
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e))
        .finally(() => {
          this.title = "";
          this.thumbnail = "";
          this.text = "";
        });
    },
  },
};
</script>

<style scoped></style>
