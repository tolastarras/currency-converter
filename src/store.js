import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromCurrencyAmount: 1,
    toCurrencyAmount: 0.86,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    currencies: []
  },
  mutations: {
    setFromCurrency (state, payload) {
      console.log('here ...', payload)
      state.fromCurrency = payload
    },
    setFromCurrencyAmount (state, amount) {
      console.log('set from currency amount ...')
      state.fromCurrencyAmount = amount
    },
    setToCurrency (state, payload) {
      console.log('there...')
      state.toCurrency = payload
    },
    setCurrencies (state, items) {
      // sort currencies in asc order
      state.currencies = items.sort((a, b) => a.name < b.name ? -1 : 1)
    },
    pushCurrency (state, currency) { state.currencies.push(currency) }
  },
  actions: {
    pushCurrencies ({ state, commit }, payload) {
      // find currency in array
      // const currencyObj = state.currencies.find(item => item.name === currency.name)
      commit('setCurrencies', payload)
    },
    updateFromCurrencyAmount ({ state, commit }, amount) {
      console.log('update currency amount ...')
      commit('setFromCurrencyAmount', amount)
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
