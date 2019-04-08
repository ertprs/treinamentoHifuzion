import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios'

Vue.use(Vuex)

const resultApi = async (context, dispatch, res) => {
  await context.dispatch(dispatch)
  return res.data
}

const parseError = error => {
  if (error.response) {
    if (error.response.status === 401) {
      return `Você não tem permissão para continuar!`
    } else {
      return error.response.data
    }
  } else if (error.request) {
    return error.request
  }
  return error.message
}

const checkError = err => {
  const data = err.response.data
  for (let key of Object.keys(data)) {
    if (Array.isArray(data[key])) {
      throw (data[key][0])
    } else {
      throw (data[key])
    }
  }
}

export default new Vuex.Store({
  state: {
    clientes: [],
    contas: [],
    cliente: null,
    todos: []
  },
  mutations: {
    CLEAN_CLIENTES (state) {
      state.clientes = []
    },
    CHANGE_CLIENTES (state, clientes) {
      state.clientes = clientes
    },
    SELECT_CLIENTE (state, cliente = null) {
      state.cliente = cliente
    },
    CLEAN_CONTAS (state) {
      state.contas = []
    },
    CHANGE_CONTAS (state, contas) {
      state.contas = contas
    },
    CLEAN_TODOS (state) {
      state.todos = []
    },
    CHANGE_TODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    carregarCliente: (context, id) => {
      return axios.get(`/contabilidade/clientes/${id}`).then(
        res => {
          context.commit('SELECT_CLIENTE', res.data)
        }
      ).catch(
        err => {
          context.commit('SELECT_CLIENTE')
          throw new Error(parseError(err))
        }
      )
    },
    listarTodos: (context, id) => axios.get('/contabilidade/todos/', { params: { cliente: id } })
      .then(res => context.commit('CHANGE_TODOS', res.data))
      .catch(
        err => {
          context.commit('CLEAN_TODOS')
          throw new Error(parseError(err))
        }
      ),
    salvarTodo: (context, todo) => axios.post('/contabilidade/todos/', todo),
    finalizarTodo: (context, id) => axios.post(`/contabilidade/todos/${id}/finalizar/`, {}),
    listarClientes: context => axios.get('/contabilidade/clientes/')
      .then(res => context.commit('CHANGE_CLIENTES', res.data))
      .catch(
        err => {
          context.commit('CLEAN_CLIENTES')
          throw new Error(parseError(err))
        }
      ),
    salvarCliente: (context, data) => {
      if ('id' in data && data.id !== 0) {
        return axios.patch(`/contabilidade/clientes/${data.id}/`, data)
          .then(res => resultApi(context, 'listarClientes', res))
          .catch(checkError)
      }

      return axios.post('/contabilidade/clientes/', data)
        .then(res => resultApi(context, 'listarClientes', res))
        .catch(checkError)
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
