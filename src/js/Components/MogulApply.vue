<template>
  <div
    :class="classObject"
    role="mogul-apply"
  ><span
      v-if="leftIsLambda"
      role="left-openparen"
  >(</span><span role="left"><mogul-expr :expr="left"></mogul-expr></span><span
      v-if="leftIsLambda"
      role="left-closeparen"
  >)</span><span
    role="right-openparen"
  >(</span><span role="right"><mogul-expr :expr="right"></mogul-expr></span><span
      role="right-closeparen"
  >)</span></div>
</template>

<script>
const Lambda = require('../Types/Lambda');

import MogulExpr from './MogulExpr.vue';

export default {
  props: ['left', 'right'],

  components: {
    MogulExpr,
  },

  data: function() {
    return {
      isActive: false,
    }
  },

  computed: {
    leftIsLambda: function() {
      return this.left instanceof Lambda;
    },

    classObject: function () {
      return {
        'mogul-apply': true,
        active: this.isActive,
      }
    }
  },
}
</script>

<style scoped>
[role=mogul-apply] {
  display: inline;
}
</style>
