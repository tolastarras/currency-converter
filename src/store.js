import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    currencies: []
  },
  mutations: {
    setFromCurrency (state, payload) {
      console.log('here ...', payload)
      state.fromCurrency = payload
    },
    setToCurrency (state, payload) { state.toCurrency = payload },
    setCurrencies (state, payload) {
      state.currencies = payload
    },
    pushCurrency (state, currency) { state.currencies.push(currency) }
  },
  actions: {
    pushCurrencies ({ state, commit }, payload) {
      // find currency in array
      // const currencyObj = state.currencies.find(item => item.name === currency.name)
      commit('setCurrencies', payload)
    },
    updateCurrency (context, payload) {
      console.log('here', payload)
    }
  },
  getters: {
    currencies (state) {
      return state.currencies
    },
    currencyName: (state) => (code) => {
      let currency = state.currencies.filter(currency => currency.code === code)
      // wait for currency to load
      if (!currency.length) return

      return currency.pop().name
    }
  }
})
