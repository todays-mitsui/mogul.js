import createPersistedState from 'vuex-persistedstate'
import { Calculator, FromJSONContextLoader, ContextDumperV2 } from 'tuber'
import rison from 'rison'

export default ({ app, store, route, isHMR }) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) {
    return
  }

  if (process.client && route.path === '/') {
    window.onNuxtReady(nuxt => {
      createPersistedState({
        key: 'MogulState',

        reducer(state) {
          console.log(app.$freezeLines(state.lines.lines.slice(-21)))
          return {
            lines: rison.encode_array(
              app.$freezeLines(state.lines.lines.slice(-21))
            ),
            commandInput: state.commandInput,
            contextPanel: state.contextPanel,
            context: rison.encode_object(
              state.calculator.calculator.dumpContext()
            )
          }
        },

        getState(key, storage) {
          try {
            const value = storage.getItem(key)

            if (typeof value === 'undefined') {
              return undefined
            }

            const state = JSON.parse(value)

            if (state == null) {
              return undefined
            }

            const calculator = new Calculator({
              loader: new FromJSONContextLoader(
                rison.decode_object(state.context)
              ),
              dumper: new ContextDumperV2()
            })
            state.calculator = { calculator }

            const lines = app.$restoreLines(rison.decode_array(state.lines))
            state.lines = { lines }

            return state
          } catch (err) {
            console.error(err)
          }

          return undefined
        }
      })(store)
    })
  }
}
