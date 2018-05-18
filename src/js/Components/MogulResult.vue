<template>
  <div class="mogul-result">
    <ul>
      <li v-for="line in lines">
        <mogul-expr :expr="line"></mogul-expr>
      </li>
    </ul>
  </div><!-- /.mogul-result -->
</template>

<script>
import MogulExpr  from './MogulExpr.vue';

module.exports = {
  props: ['lines'],

  components: {
    MogulExpr,
  },
}
</script>

<style scoped>
</style>
