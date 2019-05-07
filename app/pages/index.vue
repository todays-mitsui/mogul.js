<template>
  <div class="page-wrapper">
    <rs-panes
      split-to="columns"
      :allow-resize="contextPanelResizable"
      primary="second"
      :size="contextPanelWidth"
      :min-size="minContextPanelWidth"
      :max-size="maxContextPanelWidth"
      :resizer-thickness="2"
      :resizer-border-thickness="2"
      resizer-color="#ccc"
      @update:size="onUpdateContextPanelWidth"
    >
      <div slot="firstPane" class="first-pane">
        <main-panel />
      </div>
      <div v-if="contextPanelResizable" slot="secondPane" class="second-pane">
        <context-panel />
      </div>
    </rs-panes>

    <div
      v-if="!contextPanelResizable"
      v-show="contextPanelShown"
      class="context-panel-layer"
    >
      <context-panel />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ResSplitPane from 'vue-resize-split-pane'
import MainPanel from '~/components/MainPanel.vue'
import ContextPanel from '~/components/ContextPanel.vue'

export default {
  layout: 'app',

  components: {
    'rs-panes': ResSplitPane,
    MainPanel,
    ContextPanel
  },

  computed: {
    ...mapGetters([
      'contextPanelResizable',
      'contextPanelShown',
      'contextPanelWidth',
      'minContextPanelWidth',
      'maxContextPanelWidth'
    ])
  },

  mounted() {
    const mql = window.matchMedia('screen and (max-width: 760px)')

    const checkBreakPoint = mql => {
      if (mql.matches) {
        this.disableContextPanelResize()
      } else {
        this.enableContextPanelResize()
      }
    }

    // ブレイクポイントの瞬間に発火
    mql.addListener(checkBreakPoint)

    // 初回チェック
    checkBreakPoint(mql)
  },

  methods: {
    ...mapActions([
      'onUpdateContextPanelWidth',
      'enableContextPanelResize',
      'disableContextPanelResize'
    ])
  }
}
</script>

<style>
.pane-rs.root {
  height: calc(100% - 60px);
}
/* .pane-rs.root > .Pane {
  transition: width 250ms;
} */

.first-pane,
.second-pane {
  height: 100%;
}
.second-pane {
  overflow-y: scroll;
}

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
