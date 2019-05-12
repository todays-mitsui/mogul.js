<template>
  <div v-if="showModal" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3 v-if="title">{{ title }}</h3>
      <slot></slot>
      <button class="modal-close" @click.prevent="$emit('close')">×</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    },

    title: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20000;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;

  max-width: 90%;
  max-height: 90%;
  padding: 18px 10px 10px;

  background: #fff;

  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border-radius: 4px;

  font-size: 12px;
  color: #333;
}

h3 {
  margin: 0;
}

.modal-close {
  position: absolute;
  top: 2px;
  right: 6px;
  z-index: 1000;

  margin: 0;
  padding: 0;
  border: none;
  background: none;
  line-height: 1;

  color: #999;

  cursor: pointer;
}
.modal-close:hover {
  font-weight: 700;
}
</style>
