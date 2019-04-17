import http from '../plugins/axios'
import { addHttpToken } from './hooks'

const namespaced = true

const state = {
  token: null,
  profile: {}
}

const mutations = {
  LOGIN (state, payload) {
    state.token = payload.token
    state.profile = payload.profile

    addHttpToken(http, payload.token)
  },
  LOGOUT (state) {
    state.token = null
    state.profile = {}

    addHttpToken(http)
  },
  CHECK (state, payload) {
    state.profile = payload.profile
  }
}

const actions = {
  authLogin: (context, credentials) => http.post('/rest-auth/login/', credentials)
    .then(res => context.commit('LOGIN', res.data))
    .catch(err => {
      // TAREFA TRATAR ESSE ERRO DE UMA FORMA MAIS DINAMICA
      let message = err.response.data.non_field_errors[0]
      throw new Error(message)
    }),
  authLogout: context => http.post('/rest-auth/logout/')
    .then(res => context.commit('LOGOUT'))
    .catch(() => context.commit('LOGOUT')),
  authCheck: context => {
    addHttpToken(http, context.rootState.auth.token)
  }
}

const getters = {
  isAuthenticated: state => !!state.token
}

export default { namespaced, state, mutations, actions, getters }
