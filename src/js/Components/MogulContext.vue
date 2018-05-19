<template>
  <div class="mogul-context">
    <ul>
      <li v-for="(func, funcName) in context">
        <mogul-func
          :funcName="funcName"
          :func="func"
        ></mogul-func>
      </li>
    </ul>
  </div><!-- /.mogul-context -->
</template>

<script>
import MogulFunc  from './MogulFunc.vue';

module.exports = {
  props: ['context'],

  components: {
    MogulFunc,
  },
}
</script>

<style scoped>
.mogul-context {
  height: 100%;

  overflow-y: scroll;
}

.mogul-context > ul {
  margin: 0;
  padding: 0;

  list-style: none;
}

.mogul-context > ul > li {
  padding: 6px 8px;
}
.mogul-context > ul > li:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
.mogul-context > ul > li:nth-child(odd) {
  background: #ececec;
}
</style>
