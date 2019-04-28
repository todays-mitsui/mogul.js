<!-- eslint-disable -->
<template>
  <span class="lambda"><span class="param"><variable :label="param" /></span><span class="arrow">=></span><span class="body"><expr :expr="body" /></span></span>
</template>

<script>
import Variable from './Variable.vue'

export default {
  components: {
    Variable,
    Expr: () => import('../Expr.vue')
  },

  props: {
    param: {
      type: String,
      required: true
    },
    body: {
      type: Object,
      required: true
    }
  }
}
</script>
