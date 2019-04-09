import Vue from 'vue'
import Vuex from 'vuex'

import cliente from './cliente'
import conta from './conta'
import todo from './todo'
import generico from './generico'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cliente,
    conta,
    todo,
    generico
  }
})
