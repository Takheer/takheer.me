<template>
  <v-card class="pa-5">
    <AdminForm />
  </v-card>
</template>
<script>
import AdminForm from "../../../components/Admin/AdminForm";
export default {
  name: "Index",
  components: { AdminForm },
  middleware: ["check-auth", "auth"],
};
</script>

<style scoped></style>
