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
  height: 100vh;
  overflow: hidden;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20000;

  width: 100%;
}

.page {
  height: calc(100% - 60px);
  margin-top: 60px;
}
</style>
