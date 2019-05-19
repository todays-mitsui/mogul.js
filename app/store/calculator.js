import {
  Calculator,
  FromJSONContextLoader,
  ContextDumperV2,
  es2015StyleParser as parser
} from 'tuber'
import defaultContextSrc from '~/assets/DefaultContext.json'

export const state = () => ({
  calculator: null
})

export const getters = {
  context: state => (state.calculator ? state.calculator.context : []),
  contextLength: state =>
    state.calculator ? state.calculator.context.length : 0
}

export const mutations = {
  replaceCalculator(state, { loader, dumper }) {
    state.calculator = new Calculator({ loader, dumper })
  },

  updateCombinator(state, { name, body }) {
    state.calculator.def(name, body)
  },

  delCombinator(state, { name }) {
    state.calculator.del(name)
  }
}

export const actions = {
  loadDefaultContext({ commit }) {
    const loader = new FromJSONContextLoader(defaultContextSrc)
    const dumper = new ContextDumperV2()

    commit('replaceCalculator', { loader, dumper })
  },

  loadContextFromJSON({ commit }, json) {
    const loader = new FromJSONContextLoader(json)
    const dumper = new ContextDumperV2()

    commit('replaceCalculator', { loader, dumper })
  },

  run({ dispatch, commit, state }, input) {
    if (!input) {
      dispatch('lines/push', { type: 'Void' }, { root: true })

      return
    }

    let command
    try {
      command = parser.parseCommand(input)
    } catch (err) {
      dispatch(
        'lines/push',
        {
          type: 'ParseError',
          input,
          err
        },
        { root: true }
      )

      return
    }

    console.info('Run Command:', command)

    switch (command.action) {
      case 'Eval':
        const { sequence, done } = state.calculator.eval(command.expr)

        dispatch(
          'lines/push',
          {
            type: 'EvalSequence',
            sequence: sequence,
            last: false,
            done,
            timestamp: new Date().getTime()
          },
          { root: true }
        )

        return

      case 'Update':
        commit('updateCombinator', {
          name: command.identifier,
          body: command.callable
        })

        dispatch(
          'lines/push',
          {
            type: 'Defined',
            name: command.identifier,
            body: command.callable,
            timestamp: new Date().getTime()
          },
          { root: true }
        )

        return

      case 'Delete':
        commit('delCombinator', { name: command.identifier })

        dispatch(
          'lines/push',
          {
            type: 'Deleted',
            name: command.identifier,
            timestamp: new Date().getTime()
          },
          { root: true }
        )

        return

      case 'Info':
        const callable = state.calculator.info(command.identifier)

        if (callable) {
          dispatch(
            'lines/push',
            {
              type: 'Found',
              name: command.identifier,
              body: callable,
              timestamp: new Date().getTime()
            },
            { root: true }
          )
        } else {
          dispatch(
            'lines/push',
            {
              type: 'Undefined',
              name: command.identifier,
              timestamp: new Date().getTime()
            },
            { root: true }
          )
        }

        return

      default:
        console.log('### default ###')
    }
  }
}
