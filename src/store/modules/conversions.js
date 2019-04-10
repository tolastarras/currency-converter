export default {
  namespaced: true,
  state: {
    count: 0,
    limit: 3,
    secondsToWait: '10',
    // timestamp: 1554833728
    timestamp: 1554842457
  },
  mutations: {
    INCREMENT_COUNT (state) {
      state.count++
    },
    DECREMENT_COUNT (state) {
      state.count--
    },
    RESET_COUNT (state) {
      state.count = 0
    },
    SET_TIMESTAMP (state, timestamp) {
      state.timestamp = timestamp
    }
  },
  actions: {
    incrementCount ({ commit }) {
      commit('INCREMENT_COUNT')
    },
    decrementCount ({ commit }) {
      commit('DECREMENT_COUNT')
    },
    setTimestamp ({ commit }, timestamp) {
      commit('SET_TIMESTAMP', timestamp)
    },
    resetCount ({ commit }) {
      commit('RESET_COUNT')
    }
  },
  getters: {
    hasMore (state) {
      return state.count < state.limit
    }
  }
}
