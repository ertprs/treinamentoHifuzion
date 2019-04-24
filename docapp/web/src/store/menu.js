import http from '../plugins/axios'

const namespaced = true

const state = {
  menus: [],
  appmenus: []
}

const mutations = {
  APPLY (state, payload = []) {
    state.menus = payload
  },
  APP_MENU_APPLY (state, payload = []) {
    state.appmenus = payload
  }
}

const actions = {
  getMenus: context => http.get('/core/menus/')
    .then(res => context.commit('APPLY', res.data))
    .catch(() => context.commit('APPLY')),
  getAppMenus: context => http.get('/core/appmenus/')
    .then(res => context.commit('APP_MENU_APPLY', res.data))
    .catch(() => context.commit('APP_MENU_APPLY')),
  save: (context, form) => {
    if (form.id) {
      return http.patch(`core/menus/${form.id}/`, form)
    }
    return http.post('core/menus/', form)
  },
  remove: (context, id) => http.delete(`core/menus/${id}/`)
}

export default { namespaced, state, mutations, actions }
