import { onMounted, ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

/**
 * Queries a collection using the given query.
 */
export function useQuery(
  collection,
  options = {
    immediate: false,
    orderBy: undefined,
    limit: undefined,
    where: undefined
  }
) {
  const docs = ref([])
  const error = ref(null)
  const loading = ref(false)

  const db = firebase.firestore()

  function get() {
    loading.value = true
    error.value = null

    let q = db.collection(collection)
    if (options.where) {
      q = q.where(...options.where)
    }
    if (options.orderBy) {
      q = q.orderBy(...options.orderBy)
    }
    if (options.limit) {
      q = q.limit(options.limit)
    }

    q.get()
      .then(snap => {
        const data = []
        snap.forEach(doc => {
          data.push({ id: doc.id, ...doc.data() })
        })
        docs.value = data
        error.value = null
      })
      .catch(err => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  if (options.immediate) {
    onMounted(get)
  }

  return {
    docs,
    error,
    get,
    loading
  }
}
