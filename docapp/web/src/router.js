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
      beforeEnter: (to, from, next) => {
        store.dispatch('auth/authLogout')
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
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})

// Router Guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => typeof record.meta.requiresAuth === 'undefined' ? true : record.meta.requiresAuth)) {
    await store.dispatch('auth/authCheck')
    next()
  } else {
    next()
  }
})

export default router
