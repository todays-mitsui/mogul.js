<!-- eslint-disable -->
<template>
  <div class="undefined">
    <ol>
      <li>
        <span class="q">?</span>
        <span class="combinator">{{ name }}</span>
      </li>
      <li>
        <span class="combinator">{{ name }}</span>
        <span class="eq">=</span>
        <span class="combinator">{{ name }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
