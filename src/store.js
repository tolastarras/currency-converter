import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'

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
    SET_TO_CURRENCY_AMOUNT (state, amount) {
      state.toCurrencyAmount = amount
    },    
    SET_CURRENCIES (state, items) {
      // sort currencies in asc order
      state.currencies = items.sort((a, b) => a.name < b.name ? -1 : 1)
    }
    // pushCurrency (state, currency) {
    //   state.currencies.push(currency)
    // }
  },
  actions: {
    pushCurrencies ({ commit }, payload) {
      // find currency in array
      // const currencyObj = state.currencies.find(item => item.name === currency.name)
      commit('SET_CURRENCIES', payload)
    },
    updateFromCurrency ({ commit, dispatch }, code) {
      commit('SET_FROM_CURRENCY', code)
      dispatch('convertCurrency')
    },
    updateToCurrency ({ commit, dispatch }, code) {
      commit('SET_TO_CURRENCY', code)
      dispatch('convertCurrency')
    },    
    updateFromCurrencyAmount ({ commit, dispatch }, amount) {
      commit('SET_FROM_CURRENCY_AMOUNT', amount)
      dispatch('convertCurrency')
    },
    updateToCurrencyAmount ({ commit, dispatch }, amount) {
      commit('SET_TO_CURRENCY_AMOUNT', amount)
      dispatch('convertCurrency')
    },
    async convertCurrency ({ state, commit, getters }) {
      console.log('convert currency ...', state.fromCurrency, state.toCurrency, state.fromCurrencyAmount, state.toCurrencyAmount)
      // const abc = await getters.getExchangeRate()
      // const exchangeRate = await getters.getExchangeRate.then(response => console.log(response))
      // // const countries = await this.getCountries(state.toCurrency)
      let exchangeRate = await getters.getExchangeRate
      console.log('XR:', exchangeRate)

      const convertedAmount = (state.fromCurrencyAmount * exchangeRate).toFixed(2)
      state.toCurrencyAmount = convertedAmount

      // return `${state.fromCurrencyAmount} ${state.fromCurrency} is worth ${convertedAmount} ${state.toCurrency}.`
      // // You can use these in the following countries: ${countries}`
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
      console.log('get exchange rate ...', state.fromCurrency, state.toCurrency, state.fromCurrencyAmount, state.toCurrencyAmount)
      // const API_KEY = process.env.VUE_APP_CURRENCY_LAYER_KEY
      // let url = `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${state.toCurrency}&source=${state.fromCurrency}&format=1`

      // const response = await Axios.get(url)
      // return response.data.quotes[`${state.fromCurrency}${state.toCurrency}`]
      return Math.random() * 5
    },
    async getCountries (toCurrency) {
      // const response = await this.$http.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
      // return response.data.map(country => country.name)
    }
  }
})
