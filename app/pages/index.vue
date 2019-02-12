<template>
  <section>
    <console />
    <std-in />
  </section>
</template>

<script>
import Console from '~/components/Console.vue'
import StdIn from '~/components/StdIn.vue'

export default {
  components: {
    Console,
    StdIn
  }
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;

  height: 100%;
}

.console {
  flex-grow: 1;
}

.std-in {
}
</style>
