import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import profile from './profile'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'DocsApp'
  })],
  modules: {
    auth,
    profile
  }
})
