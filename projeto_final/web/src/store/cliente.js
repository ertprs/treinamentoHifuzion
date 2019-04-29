import { load, remove, save, set } from '../utils/vuex'

const state = {
  clientes: [],
  types: [
    { id: 1, name: 'Private' },
    { id: 2, name: 'Public' }
  ],
  graficoVenda: {
    categorias: [],
    series: []
  }
}

const mutations = {
  CLIENTES: set('clientes')
}

const url = '/core/clients/'

const actions = {
  load: (context, filter = null) => load(url, 'CLIENTES', context, filter),
  save: (context, form) => save(url, context, form),
  remove: (context, id) => remove(url, context, id)
}

export default { namespaced: true, state, mutations, actions }
