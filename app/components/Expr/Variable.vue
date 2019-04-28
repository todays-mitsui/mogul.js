<template>
  <!-- eslint-disable-next-line -->
  <span class="variavle">{{ label }}</span>
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
