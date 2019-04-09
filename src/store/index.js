import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

import conversions from './modules/conversions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    conversions
  },
  state,
  mutations,
  actions,
  getters
})
