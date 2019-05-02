import {
  Calculator,
  FromJSONContextLoader,
  es2015StyleParser as parser
} from 'tuber'
import defaultContextSrc from '~/assets/DefaultContext.json'

const MIN_WIDTH = 60

export const state = () => {
  const contextPanelWidth =
    window.innerWidth < 1200 ? MIN_WIDTH : ~~(window.innerWidth / 2)

  return {
    console: [],
    calculator: new Calculator(new FromJSONContextLoader(defaultContextSrc)),
    history: [],
    contextPanelResizable: true,
    contextPanelShown: false,
    contextPanelWidth
  }
}

export const getters = {
  context: state => state.calculator.context,
  contextLength: state => state.calculator.context.length,

  contextPanelResizable: state => state.contextPanelResizable,
  contextPanelShown: state => state.contextPanelShown,

  contextPanelWidth: state => {
    return state.contextPanelResizable ? state.contextPanelWidth : 0
  },
  minContextPanelWidth: () => MIN_WIDTH,
  maxContextPanelWidth: () => window.innerWidth - MIN_WIDTH
}

export const mutations = {
  runEval(state, { expr, last }) {
    const { sequence, done } = state.calculator.eval(expr)

    state.console.push({
      type: 'EvalSequence',
      sequence: sequence.map(expr => expr.toJSON()),
      last: !!last,
      done,
      timestamp: new Date().getTime()
    })
  },

  runDef(state, { identifier, callable }) {
    state.calculator.def(identifier, callable)

    state.console.push({
      type: 'Defined',
      name: identifier,
      body: callable.toJSON(),
      timestamp: new Date().getTime()
    })
  },

  runDel(state, { identifier }) {
    state.calculator.del(identifier)

    state.console.push({
      type: 'Defined',
      name: identifier,
      body: {
        params: [],
        bareExpr: {
          type: 'Combinator',
          label: identifier
        }
      },
      timestamp: new Date().getTime()
    })
  },

  runInfo(state, { identifier }) {
    const callable = state.calculator.info(identifier)

    if (callable) {
      state.console.push({
        type: 'Found',
        name: identifier,
        body: callable.toJSON(),
        timestamp: new Date().getTime()
      })
    } else {
      state.console.push({
        type: 'Undefined',
        name: identifier,
        timestamp: new Date().getTime()
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
  },

  enableContextPanelResize(state) {
    state.contextPanelResizable = true
  },

  disableContextPanelResize(state) {
    state.contextPanelResizable = false
  },

  toggleContextPanel(state) {
    if (state.contextPanelResizable) {
      if (state.contextPanelWidth <= MIN_WIDTH) {
        state.contextPanelWidth = ~~(window.innerWidth / 2)
      } else {
        state.contextPanelWidth = MIN_WIDTH
      }
    } else {
      state.contextPanelShown = !state.contextPanelShown
    }
  },

  updateContextPanelWidth(state, { width }) {
    state.contextPanelWidth = width
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

      case 'Delete':
        commit('runDel', {
          identifier: command.identifier
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
  },

  enableContextPanelResize({ commit }) {
    commit('enableContextPanelResize')
  },

  disableContextPanelResize({ commit }) {
    commit('disableContextPanelResize')
  },

  toggleContextPanel({ commit }) {
    commit('toggleContextPanel')
  },

  onUpdateContextPanelWidth({ commit }, width) {
    commit('updateContextPanelWidth', { width })
  }
}
