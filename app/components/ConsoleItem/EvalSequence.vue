<template>
  <div class="eval-sequence">
    <ol class="hide-items">
      <li
        v-for="(expr, i) in sequence"
        :key="i"
      >
        <expr :expr="expr" />
      </li>
    </ol>
    <p class="summary">
      {{ sequence.length }} {{ sequence.length > 1 ? 'steps' : 'step' }}, {{ done ? 'done.' : 'continued...' }}
    </p>
  </div>
</template>

<script>
import Expr from '../Expr.vue'

export default {
  components: {
    Expr
  },

  props: {
    sequence: {
      type: Array,
      required: true
    },
    done: Boolean
  }
}
</script>

<style>
.console .eval-sequence {
  border-bottom: 1px solid #ccc;
}

.console .eval-sequence li {
  position: relative;

  padding: .3em 0;
}

.console .eval-sequence li:first-child {
  padding-left: 22px;
}
.console .eval-sequence li:not(:first-child) {
  padding-left: 50px;
}

.console .eval-sequence li::before,
.console .eval-sequence li::after {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1000;

  width: 16px;

  color: #999;
}

.console .eval-sequence li:first-child::before {
  content: ">";
  transform: translateY(-50%);

  font-size: .8em;
  font-weight: 600;
  text-align: right;
}

.console .eval-sequence li:not(:first-child)::before {
  content: "→";
  left: 28px;
  transform: translateY(-25%);

  text-align: center;
}
.console .eval-sequence li:not(:first-child)::after {
  content: "β";
  left: 28px;
  transform: translateY(-75%) scale(.8);

  font-size: 10px;
  text-align: center;
}

.console .summary {
  margin: 0;
  padding: 0 .6em .2em;

  font-size: 12px;
  text-align: right;

  /* border-top: 1px dotted #ccc; */
}
</style>
