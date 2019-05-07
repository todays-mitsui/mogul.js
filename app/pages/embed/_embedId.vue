<template>
  <div class="page-wrapper">
    <main-panel />
    <div v-show="contextPanelShown" class="context-panel-layer">
      <context-panel />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainPanel from '~/components/MainPanel.vue'
import ContextPanel from '~/components/ContextPanel.vue'

export default {
  layout: 'app',

  components: {
    MainPanel,
    ContextPanel
  },

  computed: {
    ...mapGetters(['contextPanelShown'])
  }
}
</script>

<style>
.context-panel-layer {
  position: fixed;
  left: 0;
  top: 58px;
  z-index: 2000;

  width: 100%;
  height: calc(100% - 58px);

  overflow-y: scroll;
}
</style>
