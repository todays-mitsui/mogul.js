<template>
  <div class="mogul-func" role="mogul-func">
    <span class="mogul-func-funcname" role="mogul-func-funcname">{{ funcName }}</span>

    <span
      class="mogul-func-params"
      role ="mogul-func-params"
      v-if="func.params.length !== 0"
    >
      <span class="mogul-func-params-openparen">(</span>

      <span
        class="mogul-func-params-inner"
        role ="mogul-func-params-inner"
      >
        <span
          class="mogul-func-params-paramname"
          v-for="param in func.params"
        >{{ param }}</span>
      </span>

      <span class="mogul-func-params-closeparen">)</span>
    </span><!-- /.mogul-func-funcname -->

    <span class="mogul-func-eq" role="mogul-func-eq">=</span>

    <span class="mogul-func-body" role="mogul-func-body">
      <mogul-expr
        :expr="func.bareExpr"
      ></mogul-expr>
    </span><!-- /.mogul-func-body -->
  </div><!-- /.mogul-func -->
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
.mogul-func {
  font-size: 0;
}

.mogul-func-funcname,
.mogul-func-params-openparen,
.mogul-func-params-paramname,
.mogul-func-params-closeparen,
.mogul-func-eq,
.mogul-func-body {
  display: inline-block;

  font-size: 14px;
}

.mogul-func-eq {
  margin: 0 .5em;
}

.mogul-func-params-paramname:not(:last-child)::after {
  content: ", ";
}
</style>