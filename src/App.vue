<template>
  <div>User: {{ user }}</div>
  <div>Error? {{ loginError }}</div>
  <button @click="login">Login</button>
  <button @click="logout">Logout</button>

  <hr />

  <div>Doc: {{ doc }}</div>
  <div>Loading? {{ loading }}</div>
  <div>Error? {{ error }}</div>
</template>

<script>
import { ref } from 'vue'
import { useLogin, useUser, useDocument } from './composables/firebase'

export default {
  setup() {
    const { doc, error, loading } = useDocument('users', {
      immediate: true,
      documentId: 'jcJUmdiQsMgyG4OAKGkA'
    })
    const { login, logout } = useLogin()
    const { user } = useUser()

    return {
      doc,
      error,
      loading,
      login,
      logout,
      user
    }
  }
}
</script>
