<template>
  <div>Hello,{{ name }}!</div>
</template>

<style>
div {
  text-decoration: underline;
}
</style>

<script>
module.exports = {
  props: ['name'],
}
</script>
