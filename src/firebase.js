import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBlFTLVI3P2sgT0IvjoH7yiWQOUzy2ty38',
  authDomain: 'vue-next-61dfe.firebaseapp.com',
  databaseURL: 'https://vue-next-61dfe.firebaseio.com',
  projectId: 'vue-next-61dfe',
  storageBucket: 'vue-next-61dfe.appspot.com',
  messagingSenderId: '169164973657',
  appId: '1:169164973657:web:d101a4dff1879e5aa0f348'
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}
