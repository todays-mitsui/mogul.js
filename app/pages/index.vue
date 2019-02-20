<template>
  <rs-panes
    split-to="columns"
    :allow-resize="true"
    primary="second"
    units="percents"
    :size="20"
    :max-size="90"
    :min-size="10"
    :resizer-thickness="2"
    :resizer-border-thickness="2"
    resizer-color="#ccc"
  >
    <div slot="firstPane" class="first-pane">
      <main-panel />
    </div>
    <div slot="secondPane" class="second-pane">
      <context-panel />
    </div>
  </rs-panes>
</template>

<script>
import ResSplitPane from 'vue-resize-split-pane'
import MainPanel from '~/components/MainPanel.vue'
import ContextPanel from '~/components/ContextPanel.vue'

export default {
  components: {
    'rs-panes': ResSplitPane,
    MainPanel,
    ContextPanel
  }
}
</script>

<style>
.pane-rs.root {
  height: calc(100% - 60px);
}

.first-pane,
.second-pane {
  height: 100%;
}
</style>
