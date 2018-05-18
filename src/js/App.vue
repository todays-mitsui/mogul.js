<template>
  <div role="mogul-app">
    <mogul-input></mogul-input>
    <mogul-result :lines="lines"></mogul-result>
  </div>
</template>

<script>
import Expr from './Types/Expr';

import MogulInput  from './Components/MogulInput.vue';
import MogulResult from './Components/MogulResult.vue';

module.exports = {
  components: {
    MogulInput,
    MogulResult,
  },

  data: function() {
    return {
      lines: [
        Expr.com('s').apply(Expr.com('k')).apply(Expr.com('k')),
        Expr.com('i'),
        Expr.lambda('x', Expr.var('x')),
        Expr.lambda('x', Expr.lambda('y', Expr.var('y').apply(Expr.var('x')))),
      ],
    }
  }
}
</script>

<style scoped>
</style>
