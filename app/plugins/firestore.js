import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default ({ env }) => {
  const config = {
    apiKey: env.FB_API_KEY,
    authDomain: env.FB_AUTH_DOMAIN,
    databaseURL: env.FB_DATABASE_URL,
    projectId: env.FB_PROJECTID,
    storageBucket: env.FB_STORAGE_BUCKET,
    messagingSenderId: env.FB_MESSAGING_SENDER_ID
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(config)
    Vue.prototype.$firestore = firebase.firestore()
  }
}
