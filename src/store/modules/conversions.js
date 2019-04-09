export default {
  namespaced: true,
  state: {
    count: 1,
    limit: 3,
    waitTime: 15,
    dateTime: ''
  },
  mutations: {
    INCREMENT_COUNT (state) {
      state.count++
    }
  },
  actions: {
    incrementCount ({ commit }) {
      commit('INCREMENT_COUNT')
    }
  },
  getters: {
    hasMore (state) {
      return state.count < state.limit
    },
    countdown () {
      return ''
    }
  }
}
