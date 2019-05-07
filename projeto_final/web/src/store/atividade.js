import { load, remove, save, set } from '../utils/vuex'
import http from '../plugins/axios'

const state = {
  atividades: [],
  cliente: null
}

const mutations = {
  ATIVIDADES: set('atividades'),
  CLIENTE: set('cliente')
}

const url = '/crm/activities/'

const actions = {
  load: (context, filter = null) => {
    if (context.state.cliente !== null) {
      filter = {
        client: context.state.cliente
      }
    }
    return load(url, 'ATIVIDADES', context, filter)
  },
  save: (context, form) => save(url, context, form),
  remove: (context, id) => remove(url, context, id),
  start: (context, id) => http.post(`${url}${id}/start/`, {}),
  finish: (context, id) => http.post(`${url}${id}/finish/`, {})
}

export default { state, mutations, actions }
