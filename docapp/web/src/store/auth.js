import axios from '../plugins/axios'

const namespaced = true

const state = {
  token: null,
  profile: {}
}

const mutations = {
  LOGIN (state, payload) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + payload.key
    state.token = payload.key
    state.profile = payload.profile
  },
  LOGOUT (state) {
    axios.defaults.headers.common['Authorization'] = 'Token ' + state.token
    state.token = null
    state.profile = {}
  },
  CHECK (state, payload) {
    delete axios.defaults.headers.common['Authorization']
    state.profile = payload.profile
  }
}

const actions = {
  authCheck: (context, payload) => new Promise((resolve, reject) => {
    if (context.state.token !== null) {
      axios.get('rest-auth/user/').then(
        res => {
          context.commit('CHECK', res.data)
          resolve()
        }
      ).catch(
        err => {
          context.commit('LOGOUT')
          reject(err.response.data)
        }
      )
    } else {
      throw new Error('Não foi localizado chave de acesso. Efetue login novamente')
    }
  }),
  authLogin: (context, credentials) => axios.post('/rest-auth/login/', credentials).then(res => context.commit('LOGIN', res.data)),
  authLogout: context => axios.post('/rest-auth/logout/').then(res => context.commit('LOGOUT'))
}

const getters = {
  isAuthenticated: state => !!state.token
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
}
