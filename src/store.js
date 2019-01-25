import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromCurrencyAmount: 1,
    toCurrencyAmount: 0,
    exchangeRate: 0,
    fromCurrency: 'USD',
    toCurrency: 'EUR',
    currencies: [],
    error: ''
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
    },
    SET_EXCHANGE_RATE (state, amount) {
      state.exchangeRate = amount
      // set toCurrencyAmount at loading
      if (state.toCurrencyAmount === 0) {
        state.toCurrencyAmount = amount
      }
    }
  },
  actions: {
    updateFromCurrency ({ commit, dispatch }, code) {
      commit('SET_FROM_CURRENCY', code)
      dispatch('updateExchangeRate')
    },
    updateToCurrency ({ commit, dispatch }, code) {
      commit('SET_TO_CURRENCY', code)
      dispatch('updateExchangeRate')
    },
    updateFromCurrencyAmount ({ commit, dispatch }, amount) {
      dispatch('convertToCurrency', amount)
    },
    updateToCurrencyAmount ({ commit, dispatch }, amount) {
      dispatch('convertFromCurrency', amount)
    },
    async loadCurrencies ({ commit, dispatch }) {
      let elements = []

      if (!localStorage.getItem('currencies')) {
        console.log('loading currencies from API ...')

        // load currencies from api
        const response = await Axios.get('https://restcountries.eu/rest/v2/all?fields=currencies')

        response.data.map(({ currencies }) => {
          // currencies array
          currencies.map(currency => {
            // discard currencies with empty or invalid codes
            if (currency.code && currency.code !== '(none)') {
              // discard duplicates
              let hasCurrency = elements.find(element => element.code === currency.code)

              if (!hasCurrency) {
                elements.push(currency)
              }
            }
          })
        })

        // set local storage so on the next call no api call is required
        localStorage.setItem('currencies', JSON.stringify(elements))
      } else {
        elements = JSON.parse(localStorage.getItem('currencies'))
      }

      // set store currencies
      commit('SET_CURRENCIES', elements)
      dispatch('updateExchangeRate')
    },
    async updateExchangeRate ({ state, commit, dispatch }) {
      // console.log('UPDATE EXCHANGE RATE:', state.fromCurrency, state.toCurrency, state.fromCurrencyAmount, state.toCurrencyAmount)
      // const API_KEY = process.env.VUE_APP_CURRENCY_LAYER_KEY
      // let url = `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${state.toCurrency}&source=${state.fromCurrency}&format=1`

      // const response = await Axios.get(url)
      // return response.data.quotes[`${state.fromCurrency}${state.toCurrency}`]
      // let rate = Math.random() * 5

      commit('SET_EXCHANGE_RATE', (Math.random() * 5).toFixed(2))
      dispatch('convertCurrency')
    },
    async convertFromCurrency ({ state, commit }, amount) {
      let convertedAmount = amount / state.exchangeRate

      commit('SET_FROM_CURRENCY_AMOUNT', convertedAmount)
      commit('SET_TO_CURRENCY_AMOUNT', amount)
    },
    async convertToCurrency ({ state, commit }, amount) {
      let convertedAmount = amount * state.exchangeRate

      commit('SET_FROM_CURRENCY_AMOUNT', amount)
      commit('SET_TO_CURRENCY_AMOUNT', convertedAmount)
    },
    async currencyCountries ({ state, commit, actions }) {
      // return `${state.fromCurrencyAmount} ${state.fromCurrency} is worth ${convertedAmount} ${state.toCurrency}.`
      // // You can use these in the following countries: ${countries}`
      // dispatch('updateExchangeRate')
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
    async getCountries (toCurrency) {
      // const response = await this.$http.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
      // return response.data.map(country => country.name)
    }
  }
})
