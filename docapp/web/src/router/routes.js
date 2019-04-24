import store from '../store'
import { registerRouterFiles } from '../store/hooks'

const prePath = {
  'home': '/'
}

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
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
    path: '*',
    name: 'notfound',
    component: () => import('../views/NotExists.vue')
  },
  ...registerRouterFiles(prePath)
]
