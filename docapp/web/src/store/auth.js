import http from '../plugins/axios'

const namespaced = true

const state = {
  token: null,
  profile: {}
}

const addHttpToken = (token = null) => {
  delete http.defaults.headers['Authorization']
  if (token !== null) {
    http.defaults.headers['Authorization'] = 'Token ' + token
  }
}

const mutations = {
  LOGIN (state, payload) {
    state.token = payload.token
    state.profile = payload.profile

    addHttpToken(payload.token)
  },
  LOGOUT (state) {
    state.token = null
    state.profile = {}

    addHttpToken()
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
    addHttpToken(context.rootState.auth.token)
  }
}

const getters = {
  isAuthenticated: state => !!state.token
}

export default { namespaced, state, mutations, actions, getters }
