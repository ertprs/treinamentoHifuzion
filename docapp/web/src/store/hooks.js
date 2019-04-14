import axios from '../plugins/axios'

const parseError = (error) => {
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

const load = (url, params, context = null, state = null) => {
  return axios.get(url, params)
    .then(res => res.data)
    .then(data => context.commit('APPLY', { state, data }))
    .catch(err => parseError(err))
}

const save = (url, data) => {
  let verb = data.id === undefined ? 'POST' : 'PATCH'
  let urlData = data.id === undefined ? url : `${url}${data.id}/`

  return axios({ method: verb, url: urlData, data: data })
    .then(res => res.data)
    .catch(err => parseError(err))
}

const remove = (url, id) => {
  return axios(`${url}${id}/`).catch(err => parseError(err))
}

const commitDefault = (state, payload) => {
  if (Array.isArray(payload.data)) {
    state[payload.state] = payload.data
  } else {
    if (Array.isArray(state[payload.state])) {
      let update = state[payload.state].filter(
        f => f.id === payload.data.id
      ).length > 0
      if (update) {
        state[payload.state] = state[payload.state].map(
          m => m.id === payload.data.id ? payload.data : m
        )
      } else {
        state[payload.state].push(payload.data)
      }
    } else {
      state[payload.state] = payload.data
    }
  }
}

export {
  commitDefault,
  load,
  save,
  remove
}
