<template>
  <div
    role="mogul-lambda"
  ><span
      role="param"
  ><mogul-variable :identifier="param"></mogul-variable></span><span
      role="arrow"
  >=></span><span
      role="body"><mogul-expr v-bind:expr="body"></mogul-expr></span
  ></div>
</template>

<script>
import MogulExpr     from './MogulExpr.vue';
import MogulVariable from './MogulVariable.vue';

export default {
  props: ['param', 'body'],
  components: {
    MogulExpr,
    MogulVariable,
  },
}
</script>

<style scoped>
[role=mogul-lambda] {
  display: inline;
}
</style>
