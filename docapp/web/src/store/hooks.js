import camelCase from 'lodash/camelCase'

const registerStoreModules = () => {
  const requireModule = require.context('.', false, /\.js$/)
  const modules = {}

  requireModule.keys().forEach(filename => {
    if (filename === './index.js' || filename === './hooks.js') return
    const moduleName = camelCase(filename.replace(/(\.\/|\.js)/g, ''))
    modules[moduleName] = requireModule(filename).default
  })
  return modules
}

const registerRouterFiles = (prePath = {}) => {
  const requireModule = require.context('../views/', false, /\.vue$/)
  const routes = []
  const parsePath = name => prePath[name] ? prePath[name] : `/${name}`

  requireModule.keys().forEach(filename => {
    if (filename === './Login.vue' || filename === './NotExists.vue') return
    const moduleName = camelCase(filename.replace(/(\.\/|\.vue)/g, ''))
    routes.push({
      path: `${parsePath(moduleName)}`,
      name: moduleName,
      component: requireModule(filename).default
    })
  })

  return routes
}

const httpToken = (http, token = null) => {
  delete http.defaults.headers['Authorization']
  if (token !== null) {
    http.defaults.headers['Authorization'] = 'Token ' + token
  }
}

export {
  httpToken,
  registerStoreModules,
  registerRouterFiles
}
