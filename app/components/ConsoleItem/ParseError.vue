<template>
  <div class="parse-error">
    <ol>
      <li>{{ input }}</li>
      <li>
        <pre>{{ err.message.trim() }}</pre>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: String,
      default: ''
    },
    err: {
      type: Object,
      required: true
    }
  }
}
</script>
