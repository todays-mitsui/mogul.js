const MIN_WIDTH = 60

export const state = () => ({
  resizable: true,
  shown: false,
  width: MIN_WIDTH
})

export const getters = {
  width: state => (state.resizable ? state.width : 0),
  minWidth: () => MIN_WIDTH,
  maxWidth: () => window.innerWidth - MIN_WIDTH
}

export const mutations = {
  enableResize(state) {
    state.resizable = true
  },

  disableResize(state) {
    state.resizable = false
  },

  toggle(state, { windowWidth }) {
    if (state.resizable) {
      if (state.width <= MIN_WIDTH) {
        state.width = windowWidth >> 1
      } else {
        state.width = MIN_WIDTH
      }
    } else {
      state.shown = !state.shown
    }
  },

  updateWidth(state, { width }) {
    state.width = width
  }
}

export const actions = {
  enableResize({ commit }) {
    commit('enableResize')
  },

  disableResize({ commit }) {
    commit('disableResize')
  },

  toggle({ commit }) {
    commit('toggle', { windowWidth: window.innerWidth })
  },

  updateWidth({ commit }, width) {
    commit('updateWidth', { width })
  }
}
