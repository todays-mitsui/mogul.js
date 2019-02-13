<template>
  <eval-sequence
    v-if="type === 'EvalSequence'"
    :sequence="values.sequence"
    :done="values.done"
  />
</template>

<script>
import EvalSequence from './ConsoleItem/EvalSequence.vue'

export default {
  components: {
    EvalSequence
  },

  props: {
    type: {
      type: String,
      required: true
    },
    values: {
      type: Object,
      required: true
    }
  }
}
</script>
