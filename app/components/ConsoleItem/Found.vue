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
    <p class="summary">found.</p>
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

<style>
.console .found {
  border-bottom: 1px solid #ccc;
}

.console .found li {
  position: relative;

  padding: 0.3em 0;
  padding-left: 1.4em;
}

.console .found li:first-child::before {
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
