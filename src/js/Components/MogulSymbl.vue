<template>
  <span role="mogul-symbl">:{{ identifier }}</span>
</template>

<script>
export default {
  props: ['identifier'],
}
</script>

<style scoped>
span {
  display: inline-block;

  font-weight: 700px;
}
</style>
