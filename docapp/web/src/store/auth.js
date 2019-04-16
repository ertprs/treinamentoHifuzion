const namespaced = true

const state = {
  token: null,
  profile: {}
}

const commits = {
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

}

const getters = {
  isAuthenticated: state => !!state.token
}

export default { namespaced, state, commits, actions, getters }
