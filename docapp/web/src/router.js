import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: async (to, from, next) => {
        await store.dispatch('auth/authLogout')
        next('/login')
      },
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import('./views/NotExists.vue')
    }
  ]
})

let urlRedirect = null

// Router Guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => typeof record.meta.requiresAuth === 'undefined' ? true : record.meta.requiresAuth)) {
    try {
      await store.dispatch('auth/authCheck')
      if (from.name === 'login' && urlRedirect) {
        const url = urlRedirect
        urlRedirect = null
        next(url)
      } else {
        next()
      }
    } catch (e) {
      store.commit('auth/LOGOUT')
      store.commit('auth/ADD_ERROR', e.response.data.detail)
      if (to.fullPath !== '/') {
        urlRedirect = to.fullPath
        next({ path: '/login', query: { next: to.fullPath } })
      } else {
        next('/login')
      }
    }
  } else {
    if (to.name === 'login' && store.getters['auth/isAuthenticated']) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
