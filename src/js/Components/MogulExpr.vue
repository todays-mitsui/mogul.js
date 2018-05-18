<template>
  <mogul-apply
    v-if="expr instanceof Apply"
    :left="expr.left"
    :right="expr.right"
  ></mogul-apply>

  <mogul-lambda
    v-else-if="expr instanceof Lambda"
    :param="expr.param"
    :body="expr.body"
  ></mogul-lambda>

  <mogul-variable
    v-else-if="expr instanceof Variable"
    :identifier="expr.label"
  ></mogul-variable>

  <mogul-combinator
    v-else-if="expr instanceof Combinator"
    :identifier="expr.label"
  ></mogul-combinator>

  <span v-else>null</span>
</template>

<script>
const Variable   = require('../Types/Variable');
const Combinator = require('../Types/Combinator');
const Symbl      = require('../Types/Symbl');
const Lambda     = require('../Types/Lambda');
const Apply      = require('../Types/Apply');

// import MogulApply      from './MogulApply.vue';
// import MogulLambda     from './MogulLambda.vue';
import MogulVariable   from './MogulVariable.vue';
import MogulCombinator from './MogulCombinator.vue';

export default {
  beforeCreate: function () {
    this.$options.components.MogulApply      = require('./MogulApply.vue').default;
    this.$options.components.MogulLambda     = require('./MogulLambda.vue').default;
    // this.$options.components.MogulVariable   = require('./MogulVariable.vue');
    // this.$options.components.MogulCombinator = require('./MogulCombinator.vue');
  },

  // name: 'mogul-expr',
  props: ['expr'],

  components: {
    // MogulApply,
    // MogulLambda,
    MogulVariable,
    MogulCombinator,
  },

  data: function() {
    return {
      Variable,
      Combinator,
      Symbl,
      Lambda,
      Apply,
    }
  },
}
</script>
