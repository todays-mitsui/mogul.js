import { Calculator, EmptyContextLoader, es2015StyleParser as parser } from 'tuber'

export const state = () => ({
  console: [],
  calculator: new Calculator(new EmptyContextLoader())
})

export const getters = {
  context: state => state.calculator.context,
  histroy: state => state.calculator.histrory
}

export const mutations = {
  runEval(state, { expr }) {
    const sequence = state.calculator.eval(expr)

    state.console.push(...sequence)
  },

  runDef(state, { identifier, callable }) {
    state.calculator.def(identifier, callable)
  }
}

export const actions = {
  run({ commit }, { input }) {
    const command = parser.parseCommand(input)
    console.info('Run Command:', command)

    switch (command.action) {
      case 'Eval':
        commit('runEval', { expr: command.expr })

        break

      case 'Add':
      case 'Update':
        commit('runDef', {
          identifier: command.identifier,
          callable: command.callable
        })

        break

      default:
        console.log('### default ###')
    }
  }
}
