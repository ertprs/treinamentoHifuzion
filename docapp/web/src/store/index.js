import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import menu from './menu'
import cliente from './cliente'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'DocsAppV1'
    })
  ],
  modules: {
    auth,
    menu,
    cliente
  }
})
