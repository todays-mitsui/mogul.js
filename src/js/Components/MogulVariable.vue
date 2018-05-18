<template>
  <span role="mogul-variable">{{ identifier }}</span>
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
