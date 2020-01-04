import { ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

/**
 * Get reactive state for the firebase authenticated user.
 */
export function useUser() {
  const user = ref(null)
  const loading = ref(true)
  const error = ref(null)

  firebase.auth().onAuthStateChanged(fbUser => {
    if (fbUser) {
      user.value = fbUser
    } else {
      user.value = null
    }

    loading.value = false
  })

  return { user, loading, error }
}
