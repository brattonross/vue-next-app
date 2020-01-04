import { onMounted, ref } from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'

export function useDocument(
  collection,
  options = {
    documentId: undefined,
    immediate: false
  }
) {
  const doc = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const db = firebase.firestore()

  if (options.immediate) {
    onMounted(() => getDoc(options.documentId))
  }

  function createDoc(data) {
    loading.value = true
    error.value = null

    db.collection(collection)
      .add({ ...data })
      .then(docRef => {
        error.value = null
        doc.id = docRef.id
      })
      .catch(err => {
        error.value = err
        doc.value = null
      })
      .finally(() => {
        loading.value = false
      })
  }

  function getDoc(id) {
    loading.value = true
    error.value = null

    db.collection(collection)
      .doc(id)
      .get()
      .then(docRef => {
        error.value = null

        if (!docRef.exists) {
          doc.value = null
          return
        }

        doc.value = { id: docRef.id, ...docRef.data() }
      })
      .catch(err => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  function updateDoc(data) {
    loading.value = true
    error.value = null

    const { id, ...docData } = data
    db.collection(collection)
      .doc(id)
      .update(docData)
      .then(() => {
        error.value = null
        doc.value = null
      })
      .catch(err => {
        error.value = err
        doc.value = null
      })
      .finally(() => {
        loading.value = false
      })
  }

  function deleteDoc(id) {
    loading.value = true
    error.value = null

    db.collection(collection)
      .doc(id)
      .delete()
      .then(() => {
        error.value = null
        doc.value = null
      })
      .catch(err => {
        error.value = err
        doc.value = null
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    createDoc,
    deleteDoc,
    doc,
    error,
    getDoc,
    loading,
    updateDoc
  }
}
