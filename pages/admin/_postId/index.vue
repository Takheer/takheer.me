<template><div></div></template>

<script>
export default {
  name: "Index",
  middleware: ["check-auth", "auth"],
};
</script>

<style scoped></style>
