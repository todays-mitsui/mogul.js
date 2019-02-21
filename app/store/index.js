import { Calculator, FromJSONContextLoader, es2015StyleParser as parser } from 'tuber'
import defaultContextSrc from '~/assets/DefaultContext.json'

export const state = () => ({
  console: [],
  calculator: new Calculator(new FromJSONContextLoader(defaultContextSrc)),
  history: []
})

export const getters = {
  context: state => state.calculator.context
}

export const mutations = {
  runEval(state, { expr, last }) {
    const { sequence, done } = state.calculator.eval(expr)

    state.console.push({
      type: 'EvalSequence',
      sequence: sequence.map(expr => expr.toJSON()),
      last: !!last,
      done,
      timestamp: (new Date()).getTime()
    })
  },

  runDef(state, { identifier, callable }) {
    state.calculator.def(identifier, callable)

    state.console.push({
      type: 'Defined',
      name: identifier,
      body: callable.toJSON(),
      timestamp: (new Date()).getTime()
    })
  },

  runInfo(state, { identifier }) {
    const callable = state.calculator.info(identifier)

    if (callable) {
      state.console.push({
        type: 'Found',
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
  },

  runVoid(state) {
    state.console.push({
      type: 'Void'
    })
  },

  notifyParseError(state, { input, err }) {
    state.console.push({
      type: 'ParseError',
      input,
      err
    })
  }
}

export const actions = {
  run({ commit }, { input }) {
    if (!input) {
      commit('runVoid')

      return
    }

    let command
    try {
      command = parser.parseCommand(input)
    } catch (err) {
      commit('notifyParseError', { input, err })

      return
    }

    console.info('Run Command:', command)

    switch (command.action) {
      case 'Eval':
        commit('runEval', { expr: command.expr })

        return

      case 'EvalLast':
        commit('runEval', {
          expr: command.expr,
          last: true
        })

        return

      case 'Add':
      case 'Update':
        commit('runDef', {
          identifier: command.identifier,
          callable: command.callable
        })

        return

      case 'Info':
        commit('runInfo', {
          identifier: command.identifier
        })

        return

      default:
        console.log('### default ###')
    }
  }
}
