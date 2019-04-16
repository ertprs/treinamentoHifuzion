import http from '../plugins/axios'

const namespaced = true

const state = {
  token: null,
  profile: {}
}

const mutations = {
  LOGIN (state, payload) {
    state.token = payload.token
    state.profile = payload.profile
  },
  LOGOUT (state) {
    state.token = null
    state.profile = {}
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
    })
}

const getters = {
  isAuthenticated: state => !!state.token
}

export default { namespaced, state, mutations, actions, getters }
