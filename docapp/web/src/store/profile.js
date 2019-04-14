import { load, save, commitDefault, remove } from './hooks'

const namespaced = true

const state = {
  profiles: []
}

const mutations = {
  APPLY: commitDefault
}

const urlApi = '/core/profiles/'

const actions = {
  load: (context, params) => load(urlApi, params, context, 'profiles'),
  save: data => save(urlApi, data),
  remove: id => remove(urlApi, id)
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
