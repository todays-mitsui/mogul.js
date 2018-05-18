<template>
  <div class="mogul-lambda" role="mogul-lambda">
    <span class="mogul-lambda-param" role="mogul-lambda-param">
      <mogul-variable :identifier="param"></mogul-variable>
    </span>
    <span class="mogul-lambda-arrow" role="mogul-lambda-arrow">=></span>
    <span class="mogul-lambda-body" role="mogul-lambda-body">
      <mogul-expr v-bind:expr="body"></mogul-expr>
    </span>
  </div>
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
.mogul-lambda {
  display: inline;
  font-size: 0;
}

.mogul-lambda-param,
.mogul-lambda-arrow,
.mogul-lambda-body {
  font-size: 14px;
}
</style>
