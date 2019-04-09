import axios from '../plugins/axios'
import hooks from './hooks'

const namespaced = true
const state = {
  contas: []
}
const mutations = {
  CLEAN_CONTAS (state) {
    state.contas = []
  },
  CHANGE_CONTAS (state, contas) {
    state.contas = contas
  }
}
const actions = {
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
        .then(res => hooks.resultApi(context, 'listarContas', res))
    }

    return axios.post('/contabilidade/contas/', data)
      .then(res => hooks.resultApi(context, 'listarContas', res))
  },
  apagarConta: (context, data) => axios.delete(`/contabilidade/contas/${data.id}/`)
    .then(res => hooks.resultApi(context, 'listarContas', res))
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
