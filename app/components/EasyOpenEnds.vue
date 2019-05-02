<template>
  <div :class="{ 'easy-open-ends': true, active }">
    <button @click="toggleContextPanel">
      <function-icon />
      <!-- eslint-disable-next-line -->
      <span class="times">×</span>
      <!-- eslint-disable-next-line -->
      <span class="context-length">{{ contextLength }}</span>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FunctionIcon from '~/assets/img/function_icon.svg'

export default {
  components: {
    FunctionIcon
  },

  computed: {
    active() {
      return !this.contextPanelResizable && this.contextPanelShown
    },

    ...mapGetters([
      'contextLength',
      'contextPanelResizable',
      'contextPanelShown'
    ])
  },

  methods: {
    ...mapActions(['toggleContextPanel'])
  }
}
</script>

<style scoped>
.easy-open-ends {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 3000;

  transform-origin: right bottom;
  transform: rotate(-90deg);
}

button {
  padding: 0.2em 0.8em;

  color: #fff;

  border: none;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  outline: none;

  background: none;
  background-image: linear-gradient(to right bottom, #e96, #ee8166);

  cursor: pointer;
}

svg {
  width: 22px;
  height: 22px;
}

path {
  fill: #fff;
}

span {
  font-family: 'Source Code Pro', monospace;
  vertical-align: middle;
}

.active button {
  color: #e96;

  border-top: 1px solid #e96;
  border-left: 1px solid #e96;
  border-right: 1px solid #e96;

  background: #fff;
}

.active path {
  fill: #e96;
}
</style>
