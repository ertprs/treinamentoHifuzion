import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientes: [],
    contas: []
  },
  mutations: {
    CLEAN_CLIENTES (state) {
      state.clientes = []
    },
    CHANGE_CLIENTES (state, clientes) {
      state.clientes = clientes
    },
    CREATE_CLIENTE (state, cliente) {
      state.clientes.push(cliente)
    },
    UPDATE_CLIENTE (state, cliente) {
      state.clientes.forEach((c, k) => {
        if (c.id === cliente.id) {
          state.clientes[k]['nome'] = cliente.nome
          state.clientes[k]['fone'] = cliente.fone
          state.clientes[k]['email'] = cliente.email
          state.clientes[k]['conta'] = cliente.conta
          state.clientes[k]['conta_display'] = state.contas.filter(c => c.id === cliente.conta)[0]['nome']
        }
      })
    },
    DELETE_CLIENTE (state, cliente) {
      state.clientes.forEach((c, k) => {
        if (c.id === cliente.id) {
          state.clientes.splice(k, 1)
        }
      })
    },
    CLEAN_CONTAS (state) {
      state.contas = []
    },
    CHANGE_CONTAS (state, contas) {
      state.contas = contas
    },
    ADD_CONTA (state, conta) {
      state.contas.push(conta)
    },
    UPDATE_CONTA (state, conta) {
      state.contas.forEach((v, k) => {
        if (v.id === conta.id) {
          state.contas[k] = conta
        }
      })
    },
    DELETE_CONTA (state, conta) {
      state.contas.forEach((v, k) => {
        if (v.id === conta.id) {
          state.contas.splice(k, 1)
        }
      })
    }
  },
  actions: {
    salvarCliente: (context, data) => new Promise(resolve => {
      let dados = data
      if (data.id === 0) {
        dados = {
          ...data,
          conta_display: data.conta,
          id: context.state.clientes.length + 1
        }
        context.commit('CREATE_CLIENTE', dados)
      } else {
        context.commit('UPDATE_CLIENTE', dados)
      }
      resolve()
    }),
    apagarCliente: (context, data) => new Promise(resolve => {
      context.commit('DELETE_CLIENTE', data)
      resolve()
    }),
    salvarConta: (context, data) => new Promise(resolve => {
      if (data.id === 0) {
        context.commit('UPDATE_CONTA', data)
      } else {
        context.commit('ADD_CONTA', data)
      }
      resolve()
    }),
    removerConta: (context, data) => new Promise(resolve => {
      context.commit('DELETE_CONTA', data)
      resolve()
    }),
    listarContas: context => new Promise(resolve => {
      const listaContas = [
        {
          id: 3,
          nome: 'Felipe'
        },
        {
          id: 2,
          nome: 'Roberio'
        },
        {
          id: 4,
          nome: 'Teste'
        },
        {
          id: 1,
          nome: 'William'
        }
      ]
      context.commit('CHANGE_CONTAS', listaContas)
      resolve()
    }),
    listarClientes: context => new Promise(resolve => {
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
        }
      ]
      context.commit('CHANGE_CLIENTES', listaClientes)
      resolve()
    })
  }
})
