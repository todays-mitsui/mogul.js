<!-- eslint-disable -->
<template>
  <div class="found">
    <ol>
      <li>
        <span class="q">?</span>
        <span class="combinator">{{ name }}</span>
      </li>
      <li>
        <callable
          :name="name"
          :body="body"
          :update="true"
        />
      </li>
    </ol>
  </div>
</template>

<script>
import Callable from '../Callable.vue'

export default {
  components: {
    Callable
  },

  props: {
    name: {
      type: String,
      required: true
    },
    body: {
      type: Object,
      required: true
    }
  }
}
</script>
