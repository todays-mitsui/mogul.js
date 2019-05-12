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
import rison from 'rison'
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

      const docRef = this.$firestore.collection('snapshots').add({
        context: option.saveContext
          ? rison.encode_object(this.calculator.dumpContext())
          : rison.encode_object({
              version: '2.0',
              context: []
            }),

        lines: option.saveLines
          ? rison.encode_array(this.$freezeLines(this.console))
          : rison.encode_array([]),

        inputStr: option.saveInputStr ? this.inputStr : '',

        createdAt: new Date()
      })

      docRef
        .then(doc => {
          console.log('then:', doc.id)

          const id = doc.id
          this.$router.push(`/p/${id}/`)
        })
        .catch(err => {
          console.error('catch:', err)
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
