<template>
  <modal :show-modal="showModal" title="環境を保存" @close="$emit('close')">
    <div class="modal-share">
      <p>以下の項目を保存してリンクを発行します。</p>
      <fieldset>
        <label
          ><input
            v-model="saveContext"
            type="checkbox"
            disabled
          />コンテキスト</label
        >
        <label
          ><input v-model="saveCommandInput" type="checkbox" />プロンプト</label
        >
        <label><input v-model="saveLines" type="checkbox" />実行結果</label>
      </fieldset>
      <button type="submit" @click.prevent="onSubmit">決定</button>
      <button @click.prevent="$emit('cancel')">キャンセル</button>
    </div>
  </modal>
</template>

<script>
import Modal from '../Modal.vue'

export default {
  components: {
    Modal
  },

  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      saveContext: true,
      saveCommandInput: true,
      saveLines: false
    }
  },

  methods: {
    onSubmit() {
      this.$emit('submit', {
        saveContext: this.saveContext,
        saveCommandInput: this.saveCommandInput,
        saveLines: this.saveLines
      })
    }
  }
}
</script>
