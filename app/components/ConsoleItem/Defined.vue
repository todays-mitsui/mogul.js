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
    <p class="summary">
      defined.
    </p>
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
.console .defined {
  border-bottom: 1px solid #ccc;
}

.console .defined li {
  position: relative;

  padding: .3em 0;
  padding-left: 1.4em;
}

.console .defined li:first-child::before {
  content: ">";
  transform: translateY(-50%);

  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1000;

  width: 16px;

  color: #999;
  font-size: .8em;
  font-weight: 600;
  text-align: right;
}
</style>
