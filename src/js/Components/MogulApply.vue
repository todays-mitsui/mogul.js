<template>
  <div
    :class="classObject"
    role="mogul-apply"
  >
    <span
      class="mogul-apply-backquot"
      role="mogul-apply-backquot"
      @mouseenter="isActive = true"
      @mouseleave="isActive = false"
    >`</span>

    <span
      v-if="leftIsLambda"
      class="mogul-apply-left-openparen"
      role="mogul-apply-left-openparen"
    >(</span>
    <span
      class="mogul-apply-left"
      role="mogul-apply-left"
    ><mogul-expr :expr="left"></mogul-expr></span>
    <span
      v-if="leftIsLambda"
      class="mogul-apply-left-closeparen"
      role="mogul-apply-left-closeparen"
    >)</span>

    <span
      class="mogul-apply-right-openparen"
      role="mogul-apply-right-openparen"
    >(</span>
    <span
      class="mogul-apply-right"
      role="mogul-apply-right"
    ><mogul-expr :expr="right"></mogul-expr></span>
    <span
      class="mogul-apply-right-closeparen"
      role="mogul-apply-right-closeparen"
    >)</span>
  </div>
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
.mogul-apply {
  display: inline;
  font-size: 0;
}
.mogul-apply-left,
.mogul-apply-right,
.mogul-apply-left-openparen,
.mogul-apply-left-closeparen,
.mogul-apply-right-openparen,
.mogul-apply-right-closeparen {
  font-size: 14px;
}
.mogul-apply {
  border-radius: 2px;
}
.mogul-apply.active {
  display: inline-block;
  outline: 1px solid #ec8;
}
.mogul-apply > .mogul-apply-left,
.mogul-apply > .mogul-apply-right {
  margin: 0 1px;
  border: 1px solid transparent;
  border-radius: 2px;
}
.mogul-apply.active > .mogul-apply-left {
  font-weight: 700;
  background-color: #fee;
  border: 1px solid #baa;
}
.mogul-apply.active > .mogul-apply-right {
  font-weight: 700;
  background-color: #eef;
  border: 1px solid #aab;
}
</style>
