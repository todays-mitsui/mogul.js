<template>
  <div class="eval-sequence">
    <ol>
      <li
        v-for="(expr, i) in sequence"
        :key="i"
      >
        <expr :expr="expr" />
      </li>
    </ol>
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
