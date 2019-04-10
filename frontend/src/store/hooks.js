import axios from '../plugins/axios'

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

const parseData = (context, { commit, state }, data) => {
  context.commit('APPLY', { state, data })
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

const loadApi = (context, payload) => axios.get(payload.url, payload.fiters)
  .then(data => parseData(context, payload, data.data))

export {
  resultApi,
  parseError,
  checkError,
  parseData,
  commitDefault,
  loadApi
}
