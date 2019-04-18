import http from '../plugins/axios'

const namespaced = true

const state = {
  menus: []
}

const mutations = {
  APPLY (state, payload = []) {
    state.menus = payload
  }
}

const actions = {
  getMenus: context => http.get('/core/menus/')
    .then(res => context.commit('APPLY', res.data))
    .catch(() => context.commit('APPLY'))
}

export default { namespaced, state, mutations, actions }
