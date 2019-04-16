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
      component: () => import('./views/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('auth/authLogout')
        next('/login')
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
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

// Router Guard
router.beforeEach(async (to, from, next) => {
  try {
    await store.dispatch('auth/authCheck')
    next()
  } catch (err) {
    next('/login')
  }
})

export default router
