<template>
  <div :class="{ 'std-in': true, focus }">
    <p class="prompt">
      &gt;
    </p>
    <textarea
      ref="stdin"
      :value="inputStr"
      autofocus
      :placeholder="focus ? '' : '_'"
      @input="onInput"
      @focus="focus = true"
      @blur="focus = false"
      @keydown.shift.enter="onShiftEnter"
      @keydown.enter.exact="onEnter"
      @keydown.up.exact="onUp"
    />
    <button class="run" @click.prevent="onEnter">Run</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return { focus: false }
  },

  computed: {
    ...mapState(['inputStr'])
  },

  methods: {
    onInput(event) {
      this.stdIn(event.target.value)
    },

    onEnter(event) {
      if (event.shiftKey) {
        return
      }

      event.preventDefault()

      this.$store.dispatch('run', { input: this.input })

      this.input = ''

      this.$refs.stdin.focus()
    },

    onShiftEnter(event) {
      console.info('Shift + Enter')
      console.log(event)
    },

    onUp(event) {
      console.info('Up')
      console.info(event.target.selectionStart)
    },

    ...mapActions(['stdIn'])
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
  box-shadow: 0px 0px 3px 1px #adf inset;
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

.run {
  display: none;

  color: #fff;
  font-weight: 700;

  border: none;

  background-image: linear-gradient(to right top, #e96, #ee8166);

  cursor: pointer;
}

@media screen and (max-width: 760px) {
  .run {
    display: block;
  }
}
</style>
