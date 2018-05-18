<template>
  <div class="mogul-app" role="mogul-app">
    <multipane class="vertical-panes" layout="vertical">
      <div class="pane pane-left" :style="{ minWidth: '100px', width: '60%' }">
        <mogul-result :lines="lines"></mogul-result>
        <mogul-input></mogul-input>
      </div><!-- /.pane.pane-left -->

      <multipane-resizer></multipane-resizer>

      <div class="pane pane-right" :style="{ flexGrow: 1, minWidth: '100px' }">
        ### CONTEXT ###
      </div><!-- /.pane.pane-right -->
    </multipane>
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane';

import MogulInput  from './Components/MogulInput.vue';
import MogulResult from './Components/MogulResult.vue';

import Expr from './Types/Expr';

module.exports = {
  components: {
    Multipane,
    MultipaneResizer,
    MogulInput,
    MogulResult,
  },

  data: function() {
    return {
      lines: [
        Expr.com('s').apply(Expr.com('k')).apply(Expr.com('k')),
        Expr.com('i'),
        Expr.lambda('x', Expr.var('x')),
        Expr.lambda('x', Expr.lambda('y', Expr.var('y').apply(Expr.var('x')))),
        Expr.lambda('x', Expr.var('x')).apply(Expr.sym('x')),
      ],
    }
  }
}
</script>

<style scoped>
.pane-right {
  background-color: yellow;
}

.mogul-result {
  background-color: #c0ffee;
}

.mogul-input {
  background-color: #ddd;
}

.vertical-panes,
.vertical-panes > .pane,
.horizontal-panes {
  height: 100%;
}

.pane-left {
  display: flex;
  flex-direction: column;
}
.mogul-result {
  flex-grow: 1;
}
.mogul-input {
  flex-basis: 150px;
}

.vertical-panes > .multipane-resizer {
  margin: 0; left: 0;
  position: relative;
}
.vertical-panes > .multipane-resizer::before {
  display: block;
  content: "";
  width: 3px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -1.5px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.vertical-panes > .multipane-resizer:hover::before {
  border-color: #999;
}
</style>
