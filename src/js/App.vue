<template>
  <div role="mogul-app">
    <mogul-input></mogul-input>
    <mogul-result></mogul-result>
  </div>
</template>

<script>
import MogulInput  from './Components/MogulInput.vue';
import MogulResult from './Components/MogulResult.vue';

module.exports = {
  components: {
    MogulInput,
    MogulResult,
  },
}
</script>

<style scoped>
</style>
