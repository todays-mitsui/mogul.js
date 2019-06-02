<template>
  <div class="context-panel">
    <div class="inner">
      <ol>
        <li v-for="[name, body] in context" :key="name">
          <button
            title="Context から削除する"
            @click.prevent="delCombinator(name)"
          >
            <times-icon />
          </button>
          <callable :name="name" :body="body" />
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Callable from './Callable.vue'
import TimesIcon from '~/assets/img/times_icon.svg'

export default {
  components: {
    Callable,
    TimesIcon
  },

  computed: {
    ...mapGetters({
      context: 'calculator/context'
    })
  },

  methods: {
    ...mapActions({
      delCombinator: 'calculator/delCombinator'
    })
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
  padding: 0.3em 0 0.3em 2.8em;

  background-color: #fff;
}
li:nth-child(even) {
  background-color: #efefef;
}
li::before {
  counter-increment: context-item;
  content: counter(context-item) '.';

  position: absolute;
  top: 50%;
  left: 0.4em;
  z-index: 1000;

  transform: translate(0, -50%);

  width: 2.8em;

  color: #aaa;
  font-size: 0.8em;
  text-align: right;
}
li:hover::before {
  visibility: hidden;
}

li button {
  display: none;

  position: absolute;
  top: 50%;
  left: 1.2em;
  z-index: 2000;

  transform: translate(0, -50%);

  margin: 0;
  padding: 0;

  width: 14px;
  height: 14px;

  line-height: 0;

  border: none;
  background: none;

  cursor: pointer;
}
li:hover button {
  display: block;
}

li svg {
  width: 100%;
  height: 100%;
}
li svg path {
  fill: #666;
}
</style>
