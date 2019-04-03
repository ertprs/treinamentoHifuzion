import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios'

Vue.use(Vuex)

const resultApi = async (context, dispatch, res) => {
  await context.dispatch(dispatch)
  return res.data
}

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
    CLEAN_CONTAS (state) {
      state.contas = []
    },
    CHANGE_CONTAS (state, contas) {
      state.contas = contas
    }
  },
  actions: {
    listarClientes: context => axios.get('/contabilidade/clientes/')
      .then(res => context.commit('CHANGE_CLIENTES', res.data))
      .catch(
        err => {
          context.commit('CLEAN_CLIENTES')
          console.error('Ocorreu um erro na requisição. Erro:', err)
        }
      ),
    salvarCliente: (context, data) => {
      if ('id' in data && data.id !== 0) {
        return axios.patch(`/contabilidade/clientes/${data.id}/`, data)
          .then(res => resultApi(context, 'listarClientes', res))
      }

      return axios.post('/contabilidade/clientes/', data)
        .then(res => resultApi(context, 'listarClientes', res))
        .catch(
          err => {
            const data = err.response.data
            for (let key of Object.keys(data)) {
              if (Array.isArray(data[key])) {
                throw (data[key][0])
              } else {
                throw (data[key])
              }
            }
          }
        )
    },
    apagarCliente: (context, data) => axios.delete(`/contabilidade/clientes/${data.id}/`)
      .then(res => resultApi(context, 'listarClientes', res)),

    listarContas: context => axios.get('/contabilidade/contas/')
      .then(res => context.commit('CHANGE_CONTAS', res.data))
      .catch(
        err => {
          context.commit('CLEAN_CONTAS')
          console.error('Ocorreu um erro na requisição. Erro:', err)
        }
      ),
    salvarConta: (context, data) => {
      if ('id' in data && data.id !== 0) {
        return axios.patch(`/contabilidade/contas/${data.id}/`, data)
          .then(res => resultApi(context, 'listarContas', res))
      }

      return axios.post('/contabilidade/contas/', data)
        .then(res => resultApi(context, 'listarContas', res))
    },
    apagarConta: (context, data) => axios.delete(`/contabilidade/contas/${data.id}/`)
      .then(res => resultApi(context, 'listarContas', res))
  }
})
