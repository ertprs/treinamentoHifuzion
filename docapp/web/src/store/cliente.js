import http from '../plugins/axios'

const state = {
  clientes: [],
  types: [
    { id: 1, name: 'Private' },
    { id: 2, name: 'Public' }
  ]
}

const mutations = {
  CHANGE_CLIENTES (state, payload) {
    state.clientes = payload
  },
  CLEAR_CLIENTES (state, payload) {
    state.clientes = []
  }
}

const actions = {
  loadClientes: context => {
    return http.get('core/clients/').then(
      response => {
        context.commit('CHANGE_CLIENTES', response.data)
      }
    ).catch(
      () => context.commit('CLEAR_CLIENTES')
    )
  },
  saveCliente: (context, form) => {
    if (form.id) {
      return http.patch(`core/clients/${form.id}/`, form)
    }
    return http.post('core/clients/', form)
  },
  removeCliente: (context, id) => http.delete(`core/clients/${id}/`)
}

export default { namespaced: true, state, mutations, actions }
