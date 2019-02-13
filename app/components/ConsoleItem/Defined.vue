<template>
  <div class="defined">
    <ol>
      <li>
        <callable
          :name="name"
          :body="body"
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
