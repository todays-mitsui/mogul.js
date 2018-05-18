<template>
  <mogul-apply
    v-if="isApply"
    :left="expr.left"
    :right="expr.right"
  ></mogul-apply>

  <mogul-lambda
    v-else-if="isLambda"
    :param="expr.param"
    :body="expr.body"
  ></mogul-lambda>

  <mogul-variable
    v-else-if="isVariable"
    :identifier="expr.label"
  ></mogul-variable>

  <mogul-combinator
    v-else-if="isCombinator"
    :identifier="expr.label"
  ></mogul-combinator>

  <mogul-symbl
    v-else-if="isSymbl"
    :identifier="expr.label"
  ></mogul-symbl>

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
import MogulSymbl      from './MogulSymbl.vue';

export default {
  beforeCreate: function () {
    this.$options.components.MogulApply      = require('./MogulApply.vue').default;
    this.$options.components.MogulLambda     = require('./MogulLambda.vue').default;
    // this.$options.components.MogulVariable   = require('./MogulVariable.vue');
    // this.$options.components.MogulCombinator = require('./MogulCombinator.vue');
    // this.$options.components.MogulSymbl      = require('./MogulSymbl.vue');
  },

  // name: 'mogul-expr',
  props: ['expr'],

  components: {
    // MogulApply,
    // MogulLambda,
    MogulVariable,
    MogulCombinator,
    MogulSymbl,
  },

  computed: {
    isVariable: function() {
      return this.expr instanceof Variable;
    },

    isCombinator: function() {
      return this.expr instanceof Combinator;
    },

    isSymbl: function() {
      return this.expr instanceof Symbl;
    },

    isLambda: function() {
      return this.expr instanceof Lambda;
    },

    isApply: function() {
      return this.expr instanceof Apply;
    },
  }
}
</script>
