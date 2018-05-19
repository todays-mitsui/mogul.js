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
.mogul-result {
  height: 100%;
  padding-top: 66px;

  box-sizing: border-box;

  overflow-y: scroll;
}

.mogul-result > ul {
  margin: 0;
  padding: 0;

  list-style: none;
}

.mogul-result > ul > li {
  width: 100%;
  padding: 6px 8px;
}
.mogul-result > ul > li:not(:last-child) {
  border-bottom: 1px solid #ddd;
}

.mogul-result > ul > li:not(:first-child)::before {
  content: "→ ";
  font-weight: 700;
  color: #999;
}


.mogul-result > ul > li:nth-child(odd) {
  background: #ececec;
}
</style>
