<!-- eslint-disable -->
<template>
  <span class="apply"><span
    v-if="left.type === 'Lambda'"
  >(</span><span class="left"><expr :expr="left" /></span><span
    v-if="left.type === 'Lambda'"
  >)</span><span>(</span><span class="right"><expr :expr="right" /></span><span>)</span></span>
</template>

<script>
export default {
  components: {
    Expr: () => import('../Expr.vue')
  },

  props: {
    left: {
      type: Object,
      required: true
    },
    right: {
      type: Object,
      required: true
    }
  }
}
</script>
