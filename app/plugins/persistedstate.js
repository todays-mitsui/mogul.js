import createPersistedState from 'vuex-persistedstate'
import { Calculator, FromJSONContextLoader } from 'tuber'

export default ({ store, isHMR }) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) {
    return
  }

  if (process.client) {
    window.onNuxtReady(nuxt => {
      createPersistedState({
        key: 'MogulState',
        reducer(state) {
          return {
            console: state.console.slice(-21),
            contextPanelResizable: state.contextPanelResizable,
            contextPanelShown: state.contextPanelShown,
            contextPanelWidth: state.contextPanelWidth,
            context: state.calculator.dumpContext()
          }
        },

        getState(key, storage) {
          try {
            const value = storage.getItem(key)

            if (typeof value === 'undefined') {
              return undefined
            }

            const state = JSON.parse(value)
            state.calculator = new Calculator(
              new FromJSONContextLoader(state.context)
            )
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
