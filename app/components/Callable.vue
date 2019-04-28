<!-- eslint-disable -->
<template>
  <div class="callable">
    <span class="combinator">{{ name }}</span><span v-if="body.params.length" class="params">(<template v-for="(param, i) in body.params"><span :key="param+i">{{ param }}</span><span v-if="i+1<body.params.length" :key="param+i+','">,</span></template>)</span>
    <span
      class="update"
    >=</span>
    <expr :expr="body.bareExpr" />
  </div>
</template>

<script>
export default {
  components: {
    Expr: () => import('./Expr.vue')
  },

  props: {
    name: {
      type: String,
      required: true
    },
    body: {
      type: Object,
      required: true
    },
    update: {
      type: Boolean
    }
  }
}
</script>
