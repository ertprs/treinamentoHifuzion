import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientes: []
  },
  mutations: {
    CLEAN_CLIENTES (state) {
      state.clientes = []
    },
    CHANGE_CLIENTES (state, clientes) {
      state.clientes = clientes
    }
  },
  actions: {
    listarClientes: (context) => new Promise(resolve => {
      const listaClientes = [
        {
          id: 8,
          conta_display: 'Roberio',
          nome: 'a1',
          fone: '31231',
          email: 'a@email.com',
          conta: 2
        },
        {
          id: 12,
          conta_display: 'William',
          nome: 'William',
          fone: '999999999',
          email: 'william@email.com',
          conta: 1
        },
        {
          id: 13,
          conta_display: 'William',
          nome: 'William1',
          fone: '999999999',
          email: 'william1@email.com',
          conta: 1
        },
        {
          id: 14,
          conta_display: 'William',
          nome: 'William2',
          fone: '999999999',
          email: 'william2@email.com',
          conta: 1
        },
        {
          id: 15,
          conta_display: 'Teste',
          nome: 'William4',
          fone: '99999999',
          email: 'william4@email.com',
          conta: 4
        },
        {
          id: 16,
          conta_display: 'Teste',
          nome: 'William4',
          fone: '99999999',
          email: 'william4@email.com',
          conta: 4
        }
      ]
      context.commit('CHANGE_CLIENTES', listaClientes)
      resolve()
    })
  }
})
