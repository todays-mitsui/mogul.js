import _ from 'lodash'

export const state = () => {
  const defaultInputs = [
    's(k, k)(:x)',
    '6(:f, :x)',
    'and(true, or(false, true))',
    'isZero(pred(pred(pred(3))))',
    'eq(add(2, 1), 3)',
    'myNumList = cons(1, cons(2, cons(3, Nil)))',
    'flip(f) = x => y => f(y, x)',
    '? add'
  ]

  return {
    value: _.sample(defaultInputs)
  }
}

export const mutations = {
  update(state, { value }) {
    state.value = value
  },

  clear(state) {
    state.value = ''
  }
}

export const actions = {
  update({ commit }, value) {
    commit('update', { value })
  },

  clear({ commit }) {
    commit('clear')
  }
}
