import axios from '../plugins/axios'
import { commitDefault, parseData } from './hooks'

const namespaced = true

const state = {
  clientes: [],
  contas: [],
  todos: []
}

const mutations = {
  APPLY: commitDefault
}

const actions = {
  /**
   * Recebe context (do proprio vuex) e um payload
   * Estrutura do payload = {url, filters, state}
   */
  load: (context, payload) => {
    console.log(payload)
    return axios.get(payload.url, payload.fiters)
      .then(data => parseData(context, payload, data.data))
  }
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
