<template>
  <div :class="{ 'mogul-input': true, focus: focus }">
    <p class="prompt">&gt;</p>
    <textarea
      v-model="src"
      @focus="focus = true"
      @blur="focus = false"
      @keydown.shift.enter="onShiftEnter"
      @keydown.enter="onEnter"
      placeholder="_"
    ></textarea>
  </div><!-- /.mogul-input -->
</template>

<script>
import Expr from '../Types/Expr';

module.exports = {
  props: ['onSubmit'],

  data: function() {
    return {
      src: '',
      focus: false,
    }
  },

  methods: {
    onEnter: function(event) {
      if (event.shiftKey) {
        return;
      }

      event.preventDefault();

      this.onSubmit(event, this.src);

      this.src = '';
    },

    onShiftEnter: function(event) {
      console.info('Shift + Enter');
      console.log(event);
    },
  },
}
</script>

<style scoped>
.mogul-input {
  display: flex;

  border-top: 1px #999 solid;
}
.mogul-input.focus {
  background-color: #cbdcf7;
}

.prompt {
  flex-basis: 0.5em;

  margin: 0;
  padding-top: 8px;
  padding-left: 8px;

  color: #999;
  font-weight: 600;
  text-align: right;
}

textarea {
  flex-grow: 1;

  height: 100%;
  padding: 8px;
  padding-left: 4px;

  border: none;

  background: transparent;

  box-sizing: border-box;

  resize: none;
}
textarea:focus {
  outline: none;
}
</style>
