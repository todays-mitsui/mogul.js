<template>
  <div class="console">
    <div
      v-for="item in console"
      :key="item.timestamp"
      class="items"
    >
      <console-item
        :type="item.type"
        :values="item"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ConsoleItem from './ConsoleItem.vue'

export default {
  components: {
    ConsoleItem
  },

  computed: {
    ...mapState(['console'])
  }
}
</script>

<style scoped>
.console {
  font-family: 'Source Code Pro', monospace;
}
</style>
