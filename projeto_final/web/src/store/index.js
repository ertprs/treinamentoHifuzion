import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { registerStoreModules } from '../utils/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'projeto_final'
    })
  ],
  modules: registerStoreModules()
})
