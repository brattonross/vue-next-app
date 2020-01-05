import { reactive, toRefs, inject } from 'vue'
import page from 'page'
import RouterView from './view'

const RouteSymbol = Symbol()

export function useRoute() {
  return inject(RouteSymbol)
}

export default class Router {
  constructor(options) {
    if (typeof options !== 'object') {
      throw new TypeError('options must be an object')
    }

    const { routes } = options

    this.route = reactive({
      component: null,
      context: null
    })
    this.registerRoutes(routes)
  }

  registerRoutes(routes) {
    for (const { path, component } of routes) {
      page(path, context => {
        this.route.component = component
        this.route.context = context
      })
    }
    page()
  }

  install(app) {
    app.component('RouterView', RouterView)

    const route = toRefs(this.route)
    app.provide(RouteSymbol, route)
  }
}
