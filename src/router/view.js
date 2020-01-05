import { h, Suspense, computed } from 'vue'
import { useRoute } from './router'

export default {
  name: 'RouterView',

  setup() {
    const { component } = useRoute()

    const c = computed(() => {
      return typeof component.value === 'function'
        ? {
            setup() {
              return new Promise(resolve => {
                component.value().then(mod => {
                  resolve(() => h(mod.default))
                })
              })
            }
          }
        : component.value
    })
    return () => h(Suspense, null, h(c.value))
  }
}
