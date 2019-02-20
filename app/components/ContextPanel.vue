<template>
  <div class="context-panel">
    <div class="inner">
      <ol>
        <li
          v-for="[name, body] in context"
          :key="name"
        >
          <callable
            :name="name"
            :body="body"
          />
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Callable from './Callable.vue'

export default {
  components: {
    Callable
  },

  computed: {
    ...mapGetters(['context'])
  }
}
</script>

<style scoped>
.context-panel {
  font-family: 'Source Code Pro', monospace;

  counter-reset: context-item;
}

.inner {
  width: 100%;
  min-width: 300px;
}

ol {
  margin: 0;
  padding: 0;

  list-style: none;
}

li {
  position: relative;
  margin: 0;
  padding: .3em 0 .3em 2.8em;
}
li:nth-child(even) {
  background-color: #efefef;
}
li::before {
  counter-increment: context-item;
  content: counter(context-item) ".";

  position: absolute;
  top: 50%;
  left: .4em;
  z-index: 1000;

  transform: translate(0, -50%);

  width: 2.8em;

  color: #aaa;
  font-size: .8em;
  text-align: right;
}
</style>
