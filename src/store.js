import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

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
    SET_FROM_CURRENCY (state, payload) {
      state.fromCurrency = payload
    },
    SET_TO_CURRENCY (state, payload) {
      state.toCurrency = payload
    },
    SET_FROM_CURRENCY_AMOUNT (state, amount) {
      state.fromCurrencyAmount = amount
    },
    setCurrencies (state, items) {
      // sort currencies in asc order
      state.currencies = items.sort((a, b) => a.name < b.name ? -1 : 1)
    },
    pushCurrency (state, currency) {
      state.currencies.push(currency)
    },
    async convertCurrency (state) {
      const exchangeRate = await this.getExchangeRate()
      // const countries = await this.getCountries(state.toCurrency)
      const convertedAmount = (state.fromCurrencyAmount * exchangeRate).toFixed(2)

      return `${state.fromCurrencyAmount} ${state.fromCurrency} is worth ${convertedAmount} ${state.toCurrency}.`
      // You can use these in the following countries: ${countries}`
    }
  },
  actions: {
    pushCurrencies ({ state, commit }, payload) {
      // find currency in array
      // const currencyObj = state.currencies.find(item => item.name === currency.name)
      commit('setCurrencies', payload)
    },
    updateFromCurrencyAmount ({ state, commit }, amount) {
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
    },
    async getExchangeRate (state) {
      const API_KEY = process.env.VUE_APP_CURRENCY_LAYER_KEY
      let url = `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${state.toCurrency}&source=${state.fromCurrency}&format=1`

      const response = await Axios.get(url)
      return response.data.quotes[`${state.fromCurrency}${state.toCurrency}`]
    },
    async getCountries (toCurrency) {
      // const response = await this.$http.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
      // return response.data.map(country => country.name)
    }
  }
})
