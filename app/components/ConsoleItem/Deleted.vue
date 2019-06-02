<!-- eslint-disable -->
<template>
  <div class="deleted">
    <ol>
      <li>
        <span class="combinator">{{ name }}</span>
        <span class="eq">=</span>
        <span class="combinator">{{ name }}</span>
      </li>
    </ol>
    <p class="summary">
      defined.
    </p>
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
.console .deleted {
  border-bottom: 1px solid #ccc;
}

.console .deleted li {
  position: relative;

  padding: 0.3em 0;
  padding-left: 1.4em;
}

.console .deleted li:first-child::before {
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
