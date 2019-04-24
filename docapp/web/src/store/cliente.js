import { defaultMutation, load, remove, save } from './helpers'

const state = {
  clientes: [],
  types: [
    { id: 1, name: 'Private' },
    { id: 2, name: 'Public' }
  ]
}

const mutations = {
  CLIENTES: (state, payload = []) => defaultMutation(state, 'clientes', payload)
}

const url = '/core/clients/'

const actions = {
  load: context => load(url, 'CLIENTES', context),
  save: (context, form) => save(url, context, form),
  remove: (context, id) => remove(url, context, id)
}

export default { namespaced: true, state, mutations, actions }
