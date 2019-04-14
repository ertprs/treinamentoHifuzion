import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (from, to, next) => {
        await store.dispatch('auth/authLogout')
        next('/login')
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

let urlRedirect = null

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let token = null
    try {
      token = store.state.auth.token
    } catch (e) {
      console(e)
    }
    // No token
    if (token === null) {
      urlRedirect = to.fullPath
      next('/login')
      return false
    } else {
      // Verifica auth remota
      try {
        await store.dispatch('auth/authCheck')
      } catch (e) {
        console.error(e)
        next({
          name: 'login',
          query: { redirect: to.fullPath }
        })
        return false
      }

      if (urlRedirect) {
        let url = urlRedirect
        urlRedirect = null
        next(url)
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
