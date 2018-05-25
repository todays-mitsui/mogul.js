<template>
  <div role="mogul-func"><span
    role="funcname"
  >{{ funcName }}</span><span
      v-if="func.params.length !== 0"
      role="params"
  ><span role="openparen">(</span><template
        v-for="(param, index) in func.params"
  ><span
          role="param"
          :key="2*index"
  >{{ param }}</span><span
          v-if="index !== func.params.length - 1"
          role="comma"
          :key="2*index+1"
  >,</span></template><span
      role="mogul-func-params-closeparen">)</span></span
  ><span role="eq">=</span
  ><span role="body"><mogul-expr :expr="func.bareExpr"></mogul-expr></span
  ></div>
</template>

<script>
import MogulExpr from './MogulExpr.vue';

export default {
  props: ['funcName', 'func'],

  components: {
    MogulExpr,
  },
}
</script>

<style scoped>
[role=mogul-func] {
  display: inline-block;
}
[role=eq] {
  display: inline-block;
  margin: 0 .5em;
}
</style>
