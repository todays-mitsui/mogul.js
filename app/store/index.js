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
    const { sequence, step, done } = state.calculator.eval(expr)

    state.console.push({
      type: 'EvalSequence',
      sequence: sequence.map(expr => expr.toJSON()),
      step,
      done,
      timestamp: (new Date()).getTime()
    })
  },

  runDef(state, { identifier, callable }) {
    state.calculator.def(identifier, callable)

    state.console.push({
      type: 'Def',
      name: identifier,
      body: callable.toJSON(),
      timestamp: (new Date()).getTime()
    })
  },

  runInfo(state, { identifier }) {
    const callable = state.calculator.info(identifier)

    if (callable) {
      state.console.push({
        type: 'Find',
        name: identifier,
        body: callable.toJSON(),
        timestamp: (new Date()).getTime()
      })
    } else {
      state.console.push({
        type: 'Undefined',
        name: identifier,
        timestamp: (new Date()).getTime()
      })
    }
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

      case 'Info':
        commit('runInfo', {
          identifier: command.identifier
        })

        break

      default:
        console.log('### default ###')
    }
  }
}
