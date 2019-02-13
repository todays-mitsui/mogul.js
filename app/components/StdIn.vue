<template>
  <div
    :class="{ 'std-in': true, focus }"
  >
    <p class="prompt">
      &gt;
    </p>
    <textarea
      v-model="input"
      autofocus
      :placeholder="focus ? '' : '_'"
      @focus="focus = true"
      @blur="focus = false"
      @keydown.shift.enter="onShiftEnter"
      @keydown.enter="onEnter"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: 'and(true, or(false, true))',
      focus: false
    }
  },

  methods: {
    onEnter: function (event) {
      if (event.shiftKey) {
        return
      }

      event.preventDefault()

      console.log(this.$store.state.calculator)
      this.$store.dispatch('run', { input: this.input })

      this.input = ''
    },

    onShiftEnter: function (event) {
      console.info('Shift + Enter')
      console.log(event)
    }
  }
}
</script>

<style scoped>
.std-in {
  display: flex;

  line-height: 0;
  font-family: 'Source Code Pro', monospace;

  border-top: 1px solid #ccc;
}
.std-in.focus {
  box-shadow:0px 0px 3px 1px #adf inset;
}

.prompt {
  flex-basis: 1em;

  margin: 0;
  padding-top: 8px;
  padding-left: 8px;

  color: #999;
  font-weight: 600;
  line-height: 1.2;
}

textarea {
  flex-grow: 1;

  height: calc(4em * 1.2 + 16px);
  padding: 8px;
  padding-left: 4px;

  line-height: 1.2;

  background-color: transparent;

  border: none;
  box-shadow: none;
  outline: none;
  resize: none;
}
</style>
