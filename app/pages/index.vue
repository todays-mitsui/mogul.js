<template>
  <section>
    <div class="app-wrapper">
      <app-menu />

      <div class="app-main">
        <rs-panes
          split-to="columns"
          :allow-resize="resizable"
          primary="second"
          :size="width"
          :min-size="minWidth"
          :max-size="maxWidth"
          :resizer-thickness="2"
          :resizer-border-thickness="2"
          resizer-color="#ccc"
          @update:size="onUpdateWidth"
        >
          <div slot="firstPane" class="first-pane">
            <main-panel />
          </div>
          <div v-if="resizable" slot="secondPane" class="second-pane">
            <context-panel />
          </div>
        </rs-panes>
      </div>
    </div>

    <div v-if="!resizable" v-show="shown" class="context-panel-layer">
      <context-panel />
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ResSplitPane from 'vue-resize-split-pane'
import AppMenu from '~/components/AppMenu.vue'
import MainPanel from '~/components/MainPanel.vue'
import ContextPanel from '~/components/ContextPanel.vue'

export default {
  layout: 'app',

  components: {
    'rs-panes': ResSplitPane,
    AppMenu,
    MainPanel,
    ContextPanel
  },

  computed: {
    ...mapState({
      resizable: state => state.contextPanel.resizable,
      shown: state => state.contextPanel.shown
    }),

    ...mapGetters({
      width: 'contextPanel/width',
      minWidth: 'contextPanel/minWidth',
      maxWidth: 'contextPanel/maxWidth'
    })
  },

  async fetch({ store }) {
    await store.dispatch('calculator/loadDefaultContext')
  },

  mounted() {
    const mql = window.matchMedia('screen and (max-width: 760px)')

    const checkBreakPoint = mql => {
      if (mql.matches) {
        this.disableResize()
      } else {
        this.enableResize()
      }
    }

    // ブレイクポイントの瞬間に発火
    mql.addListener(checkBreakPoint)

    // 初回チェック
    checkBreakPoint(mql)
  },

  methods: {
    ...mapActions({
      onUpdateWidth: 'contextPanel/updateWidth',
      enableResize: 'contextPanel/enableResize',
      disableResize: 'contextPanel/disableResize'
    })
  }
}
</script>

<style scoped>
section {
  height: 100%;
}

.app-wrapper {
  display: flex;
  height: 100%;
}

.app-main {
  flex-grow: 1;

  position: relative;

  height: 100%;
}

.pane-rs.root {
  height: 100%;
}

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
