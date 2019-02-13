<template>
  <eval-sequence
    v-if="type === 'EvalSequence'"
    :sequence="values.sequence"
    :done="values.done"
  />

  <defined
    v-else-if="type === 'Defined'"
    :name="values.name"
    :body="values.body"
  />
</template>

<script>
import EvalSequence from './ConsoleItem/EvalSequence.vue'
import Defined from './ConsoleItem/Defined.vue'

export default {
  components: {
    EvalSequence,
    Defined
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
