import { ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

export function useLogin() {
  const user = ref(null)
  const error = ref(null)
  const provider = new firebase.auth.GoogleAuthProvider()

  function login() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {})
      .catch(err => {
        error.value = err
      })
  }

  function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch(err => {
        error.value = err
      })
  }

  return { error, login, logout }
}
