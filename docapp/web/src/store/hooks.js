const httpToken = (http, token = null) => {
  delete http.defaults.headers['Authorization']
  if (token !== null) {
    http.defaults.headers['Authorization'] = 'Token ' + token
  }
}

export {
  httpToken
}