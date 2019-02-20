<template>
  <div class="main-panel">
    <console />
    <std-in />
  </div>
</template>

<script>
import Console from './Console.vue'
import StdIn from './StdIn.vue'

export default {
  components: {
    Console,
    StdIn
  }
}
</script>

<style>
.main-panel {
  display: grid;
  grid-template-rows: 1fr 96px;
  grid-template-columns: 1fr;

  height: 100%;
}
</style>
