<template>
  <span role="mogul-combinator">{{ identifier }}</span>
</template>

<script>
export default {
  props: ['identifier'],
}
</script>

<style scoped>
span {
  display: inline-block;
}
</style>
