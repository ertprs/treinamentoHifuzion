import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientes: [],
    contas: []
  },
  mutations: {
    CHANGE_CLIENTES (state, payload) {
      state.clientes = payload
    },
    CLEAR_CLIENTES (state, payload) {
      state.clientes = []
    },
    CHANGE_CONTAS (state, payload) {
      state.contas = payload
    },
    CLEAR_CONTAS (state, payload) {
      state.contas = []
    }
  },
  actions: {
    startClientes: context => {
      return axios.get('contabilidade/clientes/').then(
        response => {
          context.commit('CHANGE_CLIENTES', response.data)
        }
      ).catch(
        () => context.commit('CLEAR_CLIENTES')
      )
    },
    loadContas: context => {
      return axios.get('contabilidade/contas/').then(
        response => {
          context.commit('CHANGE_CONTAS', response.data)
        }
      ).catch(
        () => context.commit('CLEAR_CONTAS')
      )
    },
    saveCliente: (context, form) => {
      if (form.id) {
        return axios.patch(`contabilidade/clientes/${form.id}/`, form)
      }
      return axios.post('contabilidade/clientes/', form)
    },
    removeCliente: (context, id) => axios.delete(`contabilidade/clientes/${id}/`)
  }
})
