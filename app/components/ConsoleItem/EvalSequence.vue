<template>
  <div class="eval-sequence">
    <ol>
      <template v-if="ellipsis">
        <li><expr :expr="headExpr" /></li>
        <li
          class="show-btn"
          title="途中式を表示"
          @click.prevent="ellipsis = !ellipsis"
        >
          <button>{{ sequence.length - 2 }} steps</button>
        </li>
        <li><expr :expr="lastExpr" /></li>
      </template>
      <template v-else>
        <li v-for="(expr, i) in sequence" :key="i">
          <expr :expr="expr.toJSON()" />
        </li>
      </template>
    </ol>
    <p class="summary">
      {{ sequence.length }} {{ sequence.length > 1 ? 'steps' : 'step' }},
      {{ done ? 'done.' : 'continued...' }}
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
    last: {
      type: Boolean,
      default: false
    },
    done: Boolean
  },

  data() {
    return {
      ellipsis: this.last && this.sequence.length > 2
    }
  },

  computed: {
    headExpr() {
      return this.sequence[0]
    },

    lastExpr() {
      return this.sequence.slice(-1)[0]
    }
  }
}
</script>

<style>
.console .eval-sequence {
  border-bottom: 1px solid #ccc;
}

.console .eval-sequence li {
  position: relative;

  padding: 0.3em 0;
}

.console .eval-sequence li:first-child {
  padding-left: 22px;
}
.console .eval-sequence li:not(:first-child):not(.show-btn) {
  padding-left: 42px;
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
  content: '>';
  transform: translateY(-50%);

  font-size: 0.8em;
  font-weight: 600;
  text-align: right;
}

.console .eval-sequence li:not(:first-child):not(.show-btn)::before {
  content: '→';
  left: 20px;
  transform: translateY(-25%);

  text-align: center;
}
.console .eval-sequence li:not(:first-child):not(.show-btn)::after {
  content: 'β';
  left: 20px;
  transform: translateY(-75%) scale(0.8);

  font-size: 10px;
  text-align: center;
}

/* 途中省略の表現 */
.console .eval-sequence li.show-btn {
  position: relative;

  height: 27.5px;
  padding-left: 20px;

  cursor: pointer;
}
.console .eval-sequence li.show-btn button {
  position: absolute;
  top: 50%;
  left: 36px;
  z-index: 1000;

  transform: translateY(-50%);

  font-size: 10px;

  border: none;
  border: 1px solid #aaa;
  border-radius: 4px;

  cursor: pointer;

  transition: background-color 200ms 0ms ease;
}
.console .eval-sequence li.show-btn:hover button {
  background-color: #efefef;
}
/* 途中省略の破線 */
.console .eval-sequence li.show-btn::before {
  content: '';

  position: absolute;
  left: 0;
  top: 50%;
  z-index: -1;

  transform: translateY(-1px);

  display: block;
  width: calc(100% - 30px);
  height: 0;
  margin-left: 20px;
  margin-right: 10px;

  border-bottom: 2px dashed #ddd;
}
.console .eval-sequence li.show-btn:hover::before {
  border-bottom-color: #aaa;
}

.console .summary {
  margin: 0;
  padding: 0 0.6em 0.2em;

  font-size: 12px;
  text-align: right;

  /* border-top: 1px dotted #ccc; */
}
</style>
