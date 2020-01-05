import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import './firebase'
import './styles/index.css'

const router = new Router({
  routes: [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/create', component: () => import('./views/Create.vue') }
  ]
})

createApp()
  .use(router)
  .mount(App, '#app')
