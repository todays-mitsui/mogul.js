<template>
  <div ref="container" class="console">
    <div v-for="item in console" :key="item.timestamp" class="items">
      <console-item
        :type="item.type"
        :values="item"
        :on-mounted="scrollBottom"
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
  },

  methods: {
    /**
     *  Console に新しいアイテムが追加された時、Console を一番下までスクロールする
     */
    scrollBottom() {
      const container = this.$refs.container
      const startPosition = container.scrollTop
      const lestDistance =
        container.scrollHeight - container.offsetHeight - container.scrollTop

      if (lestDistance < 0) {
        return
      }

      let start = null
      function scroll(timestamp) {
        if (!start) {
          start = timestamp
        }

        const progress = timestamp - start

        container.scrollTop =
          startPosition + Math.ceil((progress * lestDistance) / 250)

        if (progress < 250) {
          window.requestAnimationFrame(scroll)
        }
      }

      window.requestAnimationFrame(scroll)
    }
  }
}
</script>

<style>
.console {
  overflow-y: scroll;
}

.console ol {
  margin: 0;
  padding: 0;

  list-style: none;

  font-family: 'Source Code Pro', monospace;
}

.console li {
  margin: 0;
  padding: 0;
}
</style>
