<template>
  <span role="mogul-symbl">:{{ identifier }}</span>
</template>

<script>
export default {
  props: ['identifier'],
}
</script>

<style scoped>
[role=mogul-symbl] {
  display: inline-block;
  font-weight: 700px;
}
</style>
