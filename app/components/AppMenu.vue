<template>
  <div class="app-menu">
    <ul>
      <li class="share">
        <button title="Share" @click.prevent="showShareModal = true">
          <share-icon />
        </button>
      </li>
    </ul>
    <share-modal
      :show-modal="showShareModal"
      @close="showShareModal = false"
      @submit="publishPermalink"
      @cancel="showShareModal = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShareIcon from '~/assets/img/share_icon.svg'
import ShareModal from '~/components/Modal/ShareModal.vue'

export default {
  components: {
    ShareModal,
    ShareIcon
  },

  data() {
    return {
      showShareModal: false
    }
  },

  computed: {
    ...mapState(['console', 'inputStr', 'calculator'])
  },

  methods: {
    publishPermalink(option) {
      this.showShareModal = false

      this.$store.dispatch('firestore/saveSnapshot', {
        saveLines: option.saveLines,
        saveCommandInput: option.saveInputStr,
        saveContext: option.saveContext
      })
    }
  }
}
</script>

<style scoped>
.app-menu {
  border-right: 2px solid #ccc;

  background-color: #eee;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

button {
  width: 100%;
  height: 48px;

  border: none;
  background: none;
  cursor: pointer;
}
svg {
  width: 30px;
}
path {
  fill: #999;

  transition: fill 250ms 0ms ease;
}

button:hover path {
  fill: #666;
}
</style>
