<template>
  <div class="mogul-input">
    <input
      type="text"
      v-model="expr"
    >
  </div><!-- /.mogul-input -->
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
