import axios from '../plugins/axios'
import hooks from './hooks'

const namespaced = true

const state = {
  clientes: [],
  cliente: null
}

const mutations = {
  APPLY: hooks.commitDefault,
  CLEAN_CLIENTES (state) {
    state.clientes = []
  },
  CHANGE_CLIENTES (state, clientes) {
    state.clientes = clientes
  },
  SELECT_CLIENTE (state, cliente = null) {
    state.cliente = cliente
  }
}

const actions = {
  loadApi: hooks.loadApi,
  carregarCliente: (context, id) => {
    return axios.get(`/contabilidade/clientes/${id}`).then(
      res => {
        context.commit('SELECT_CLIENTE', res.data)
      }
    ).catch(
      err => {
        context.commit('SELECT_CLIENTE')
        throw new Error(hooks.parseError(err))
      }
    )
  },
  listarClientes: context => axios.get('/contabilidade/clientes/')
    .then(res => context.commit('CHANGE_CLIENTES', res.data))
    .catch(
      err => {
        context.commit('CLEAN_CLIENTES')
        throw new Error(hooks.parseError(err))
      }
    ),
  salvarCliente: (context, data) => {
    if ('id' in data && data.id !== 0) {
      return axios.patch(`/contabilidade/clientes/${data.id}/`, data)
        .then(res => hooks.resultApi(context, 'listarClientes', res))
        .catch(hooks.checkError)
    }

    return axios.post('/contabilidade/clientes/', data)
      .then(res => hooks.resultApi(context, 'listarClientes', res))
      .catch(hooks.checkError)
  },
  apagarCliente: (context, data) => axios.delete(`/contabilidade/clientes/${data.id}/`)
    .then(res => hooks.resultApi(context, 'listarClientes', res))
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
