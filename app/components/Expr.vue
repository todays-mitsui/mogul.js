<template>
  <variable v-if="expr.type === 'Variable'" :label="expr.label" />

  <combinator v-else-if="expr.type === 'Combinator'" :label="expr.label" />

  <symbl v-else-if="expr.type === 'Symbol'" :label="expr.label" />

  <apply
    v-else-if="expr.type === 'Apply'"
    :left="expr.left"
    :right="expr.right"
  />

  <lambda
    v-else-if="expr.type === 'Lambda'"
    :param="expr.param"
    :body="expr.body"
  />
</template>

<script>
import Variable from './Expr/Variable.vue'
import Combinator from './Expr/Combinator.vue'
import Symbl from './Expr/Symbl.vue'
import Apply from './Expr/Apply.vue'
import Lambda from './Expr/Lambda.vue'

export default {
  components: {
    Variable,
    Combinator,
    Symbl,
    Apply,
    Lambda
  },

  props: {
    expr: {
      type: Object,
      required: true
    }
  }
}
</script>
