import axios from '../plugins/axios'
import hooks from './hooks'

const namespaced = true

const state = {
  clientes: [],
  contas: [],
  todos: []
}

const mutations = {
  APPLY: hooks.commitDefault
}

const actions = {
  /**
   * Recebe context (do proprio vuex) e um payload
   * Estrutura do payload = {url, filters, state}
   */
  load: (context, payload) => {
    console.log(payload)
    return axios.get(payload.url, payload.fiters)
      .then(data => hooks.parseData(context, payload, data.data))
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
