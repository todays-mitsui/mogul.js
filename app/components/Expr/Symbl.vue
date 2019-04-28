<template>
  <!-- eslint-disable-next-line -->
  <span class="symbol">:{{ label }}</span>
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
