import { load, remove, save, set } from '../utils/vuex'

const state = {
  atividades: []
}

const mutations = {
  ATIVIDADES: set('atividades')
}

const url = '/crm/activities/'

const actions = {
  load: (context, filter = null) => load(url, 'ATIVIDADES', context, filter),
  save: (context, form) => save(url, context, form),
  remove: (context, id) => remove(url, context, id)
}

export default { state, mutations, actions }
