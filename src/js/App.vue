<template>
  <div class="mogul-app" role="mogul-app">
    <multipane class="vertical-panes" layout="vertical">
      <div class="pane pane-left" :style="{ minWidth: '100px', width: '60%' }">
        <mogul-result
          :lines="lines"
        ></mogul-result>
        <mogul-input
          :onSubmit="onSubmit"
        ></mogul-input>
      </div><!-- /.pane.pane-left -->

      <multipane-resizer></multipane-resizer>

      <div class="pane pane-right" :style="{ flexGrow: 1, minWidth: '100px' }">
        <mogul-context
          :context="context"
        ></mogul-context>
      </div><!-- /.pane.pane-right -->
    </multipane>
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane';

import MogulInput   from './Components/MogulInput.vue';
import MogulResult  from './Components/MogulResult.vue';
import MogulContext from './Components/MogulContext.vue';


import Expr  from './Types/Expr';
import Mogul from './Mogul';

module.exports = {
  components: {
    Multipane,
    MultipaneResizer,
    MogulInput,
    MogulResult,
    MogulContext,
  },

  data: function() {
    return {
      mogul: null,

      lines: [],
    }
  },

  methods: {
    onSubmit: function(event, src) {
      window.mogul = this.mogul;

      this.mogul.run(src);
    }
  },

  computed: {
    context: function() {
      return this.mogul.context._toJS();
    },
  },

  created: function() {
    this.mogul = new Mogul(this.lines);
  }
}
</script>

<style scoped>
.vertical-panes,
.vertical-panes > .pane,
.horizontal-panes {
  height: 100%;
}

.pane-left {
  display: flex;
  flex-direction: column;

  border-right: 1px solid #999;
}
.pane-right {
  border-left: 1px solid #999;
}
.mogul-result {
  flex-grow: 1;
}
.mogul-input {
  flex-basis: 150px;
}

.vertical-panes > .multipane-resizer {
  position: relative;
  left: 0;

  margin: 0;
}
.vertical-panes > .multipane-resizer::before {
  display: block;
  content: "";
  width: 4px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -2px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
}
.vertical-panes > .multipane-resizer:hover::before {
  border-color: #999;
}
</style>
