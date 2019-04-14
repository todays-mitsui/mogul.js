<template>
  <rs-panes
    split-to="columns"
    :allow-resize="true"
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
    <div slot="secondPane" class="second-pane">
      <context-panel />
    </div>
  </rs-panes>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ResSplitPane from 'vue-resize-split-pane'
import MainPanel from '~/components/MainPanel.vue'
import ContextPanel from '~/components/ContextPanel.vue'

export default {
  components: {
    'rs-panes': ResSplitPane,
    MainPanel,
    ContextPanel
  },

  asyncData() {
    return {
      minWidth: 60,
      maxWidth: ~~(window.innerWidth / 2)
    }
  },

  computed: {
    ...mapGetters(['contextPanelWidth', 'minContextPanelWidth', 'maxContextPanelWidth'])
  },

  methods: {
    ...mapActions(['onUpdateContextPanelWidth'])
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
