<template>
  <span role="mogul-variable">{{ identifier }}</span>
</template>

<script>
export default {
  props: ['identifier'],
}
</script>

<style scoped>
[role=mogul-variable] {
  display: inline-block;
}
</style>
