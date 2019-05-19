import rison from 'rison'
import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECTID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID
}

firebase.initializeApp(config)
const firestore = firebase.firestore()

export const state = () => {
  return {}
}

export const mutations = {}

export const actions = {
  saveSnapshot({ rootState }, { saveLines, saveCommandInput, saveContext }) {
    const context = saveContext
      ? rootState.calculator.calculator.dumpContext()
      : {
          version: '2.0',
          context: []
        }
    const encodedContext = rison.encode_object(context)

    const lines = saveLines ? rootState.lines.lines : []
    const encodedLines = rison.encode_array(lines)

    const commandInput = saveCommandInput ? rootState.commandInput.value : ''

    firestore
      .collection('snapshots')
      .add({
        context: encodedContext,
        lines: encodedLines,
        commandInput: commandInput,
        createdAt: new Date()
      })
      .then(doc => {
        const id = doc.id

        this.$router.push(`/p/${id}/`)
      })
      .catch(err => {
        console.error('catch:', err)
      })
  },

  loadSnapshot({ dispatch }, id) {
    firestore
      .collection('snapshots')
      .doc(id)
      .get()
      .then(doc => {
        if (!doc.exists) {
          this.$router.push(`/`)
        }

        const { context, lines, commandInput } = doc.data()

        const decodedContext = rison.decode_object(context)
        const decodedLines = rison.decode_array(lines)

        dispatch('calculator/loadContextFromJSON', decodedContext, {
          root: true
        })
        dispatch('lines/replace', decodedLines, { root: true })
        dispatch('commandInput/update', commandInput, { root: true })
      })
      .catch(err => {
        console.error('error:', err)
      })
  }
}
