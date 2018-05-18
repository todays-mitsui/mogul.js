<template>
  <div>Hello,{{ name }}!</div>
</template>

<script>
module.exports = {
  props: ['name'],
}
</script>

<style scoped>
div {
  text-decoration: underline;
}

div::before {
  content: "### ";
}
</style>
