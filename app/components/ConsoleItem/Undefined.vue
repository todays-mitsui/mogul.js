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
    <p class="summary">undefined.</p>
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

<style>
.console .undefined {
  border-bottom: 1px solid #ccc;
}

.console .undefined li {
  position: relative;

  padding: 0.3em 0;
  padding-left: 1.4em;
}

.console .undefined li:first-child::before {
  content: '>';
  transform: translateY(-50%);

  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1000;

  width: 16px;

  color: #999;
  font-size: 0.8em;
  font-weight: 600;
  text-align: right;
}
</style>
