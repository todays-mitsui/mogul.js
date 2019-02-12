<template>
  <div class="container">
    <app-header />
    <div class="page">
      <nuxt />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'

export default {
  components: {
    AppHeader
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  height: 100vh;
}

.page {
  flex-grow: 1;
}

.monospace {
  font-family: 'Source Code Pro', monospace;
}
</style>
