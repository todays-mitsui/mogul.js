<template>
  <div class="main-panel">
    <console />
    <std-in />
    <easy-open-ends />
  </div>
</template>

<script>
import Console from './Console.vue'
import StdIn from './StdIn.vue'
import EasyOpenEnds from './EasyOpenEnds.vue'

export default {
  components: {
    Console,
    StdIn,
    EasyOpenEnds
  }
}
</script>

<style>
.main-panel {
  position: relative;

  display: grid;
  grid-template-rows: 1fr 96px;
  grid-template-columns: 1fr;

  height: 100%;
}
</style>
