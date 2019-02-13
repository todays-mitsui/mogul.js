<template>
  <!-- eslint-disable-next-line -->
  <span class="combinator">{{ label }}</span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  }
}
</script>
