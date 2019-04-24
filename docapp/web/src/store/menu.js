import { defaultMutation, load, save, remove } from './helpers'

const namespaced = true

const state = {
  menus: [],
  appmenus: []
}

const mutations = {
  MENUS: (state, payload = []) => defaultMutation(state, 'menus', payload),
  APPMENUS: (state, payload = []) => defaultMutation(state, 'appmenus', payload)
}

const url = '/core/menus/'

const actions = {
  load: context => load(url, 'MENUS', context),
  loadAppMenus: context => load('/core/appmenus/', 'APPMENUS', context),
  save: (context, form) => save(url, context, form),
  remove: (context, id) => remove(url, context, id)
}

export default { namespaced, state, mutations, actions }
