export const state = () => ({
  lines: []
})

export const mutations = {
  push(state, { line }) {
    state.lines.push(line)
  },

  replace(state, { lines }) {
    state.lines = lines
  }
}

export const actions = {
  push({ commit }, line) {
    commit('push', { line })
  },

  replace({ commit }, lines) {
    commit('replace', { lines })
  }
}
