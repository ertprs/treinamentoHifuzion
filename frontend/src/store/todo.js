import axios from '../plugins/axios'
import hooks from './hooks'

const namespaced = true
const state = {
  todos: []
}
const mutations = {
  CLEAN_TODOS (state) {
    state.todos = []
  },
  CHANGE_TODOS (state, todos) {
    state.todos = todos
  }
}
const actions = {
  listarTodos: (context, id) => axios.get('/contabilidade/todos/', { params: { cliente: id } })
    .then(res => context.commit('CHANGE_TODOS', res.data))
    .catch(
      err => {
        context.commit('CLEAN_TODOS')
        throw new Error(hooks.parseError(err))
      }
    ),
  salvarTodo: (context, todo) => axios.post('/contabilidade/todos/', todo),
  finalizarTodo: (context, id) => axios.post(`/contabilidade/todos/${id}/finalizar/`, {})
}

export default {
  namespaced,
  state,
  mutations,
  actions
}
