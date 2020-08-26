<template>
  <AdminForm :id="$route.params.postId" :post="post" />
</template>

<script>
import AdminForm from "../../../components/Admin/AdminForm";
export default {
  name: "Index",
  components: { AdminForm },
  asyncData(context) {
    return context.$axios
      .$get("posts/" + context.params.postId + ".json")
      .then((data) => {
        return {
          post: data,
        };
      });
  },
  middleware: ["check-auth", "auth"],
};
</script>

<style scoped></style>
