<template>
  <input
    type="text"
    v-model="expr"
  >
</template>

<script>
import Expr from '../Types/Expr';

module.exports = {
  data: function() {
    return {
      expr: 'foobar',
    }
  }
}
</script>

<style scoped>
</style>
