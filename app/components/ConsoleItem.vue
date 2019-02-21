<template>
  <eval-sequence
    v-if="type === 'EvalSequence'"
    :sequence="values.sequence"
    :last="values.last"
    :done="values.done"
  />

  <defined
    v-else-if="type === 'Defined'"
    :name="values.name"
    :body="values.body"
  />

  <found
    v-else-if="type === 'Found'"
    :name="values.name"
    :body="values.body"
  />

  <undefined
    v-else-if="type === 'Undefined'"
    :name="values.name"
  />

  <void
    v-else-if="type === 'Void'"
  />

  <parse-error
    v-else-if="type === 'ParseError'"
    :input="values.input"
    :err="values.err"
  />
</template>

<script>
import EvalSequence from './ConsoleItem/EvalSequence.vue'
import Defined from './ConsoleItem/Defined.vue'
import Found from './ConsoleItem/Found.vue'
import Undefined from './ConsoleItem/Undefined.vue'
import Void from './ConsoleItem/Void.vue'
import ParseError from './ConsoleItem/ParseError.vue'

export default {
  components: {
    EvalSequence,
    Defined,
    Found,
    Undefined,
    Void,
    ParseError
  },

  props: {
    type: {
      type: String,
      required: true
    },
    values: {
      type: Object,
      required: true
    },
    onMounted: {
      type: Function,
      default: null
    }
  },

  mounted() {
    this.onMounted && this.onMounted()
  }
}
</script>
