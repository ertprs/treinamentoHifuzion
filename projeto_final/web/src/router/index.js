import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

function route (path, view, name) {
  return {
    name: name || view,
    path,
    component: () => import(`@/views/${view}.vue`)
  }
}

Vue.use(Router)

const router = new Router({
  routes: routes
    .map(path => route(path.path, path.view, path.name))
    .concat([{ path: '*', redirect: '/dashboard' }]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

export default router
