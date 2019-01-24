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
      console.log('SET_FROM_CURRENCY_AMOUNT:', amount)
      state.fromCurrencyAmount = amount
    },
    SET_TO_CURRENCY_AMOUNT (state, amount) {
      state.toCurrencyAmount = amount
    },
    SET_CURRENCIES (state, items) {
      console.log('set currencies ...')
      // sort currencies in asc order
      state.currencies = items.sort((a, b) => a.name < b.name ? -1 : 1)
    },
    SET_EXCHANGE_RATE (state, amount) {
      console.log('AMOUNT:', amount)
      state.exchangeRate = amount
      // set toCurrencyAmount at loading
      if (state.toCurrencyAmount === 0) {
        state.toCurrencyAmount = amount
      }
    }
    // pushCurrency (state, currency) {
    //   state.currencies.push(currency)
    // }
  },
  actions: {
    // pushCurrencies ({ commit }, payload) {
    //   // find currency in array
    //   // const currencyObj = state.currencies.find(item => item.name === currency.name)
    //   commit('SET_CURRENCIES', payload)
    // },
    updateFromCurrency ({ commit, dispatch }, code) {
      console.log('CODE:', code)
      commit('SET_FROM_CURRENCY', code)
      dispatch('convertCurrency')
    },
    updateToCurrency ({ commit, dispatch }, code) {
      console.log('CODE:', code)
      commit('SET_TO_CURRENCY', code)
      dispatch('convertCurrency')
    },
    updateFromCurrencyAmount ({ commit, dispatch }, amount) {
      console.log('AMOUNT:', amount)
      commit('SET_FROM_CURRENCY_AMOUNT', amount)
      // dispatch('convertCurrency')
    },
    updateToCurrencyAmount ({ commit, dispatch }, amount) {
      commit('SET_TO_CURRENCY_AMOUNT', amount)
      dispatch('convertCurrency')
    },
    async loadCurrencies ({ commit }) {
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
    },
    async updateExchangeRate ({ state, commit }) {
      console.log('UPDATE EXCHANGE RATE:', state.fromCurrency, state.toCurrency, state.fromCurrencyAmount, state.toCurrencyAmount)
      // const API_KEY = process.env.VUE_APP_CURRENCY_LAYER_KEY
      // let url = `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${state.toCurrency}&source=${state.fromCurrency}&format=1`

      // const response = await Axios.get(url)
      // return response.data.quotes[`${state.fromCurrency}${state.toCurrency}`]
      // let rate = Math.random() * 5

      commit('SET_EXCHANGE_RATE', (Math.random() * 5).toFixed(2))
    },
    async convertCurrency ({ state, commit, actions }) {
      console.log('convert currency ...', state.fromCurrency, state.toCurrency, state.fromCurrencyAmount, state.toCurrencyAmount)
      // const abc = await getters.exchangeRate()
      // const exchangeRate = await getters.eExchangeRate.then(response => console.log(response))
      // // const countries = await this.getCountries(state.toCurrency)
      await commit.updateExchangeRate
      console.log('XR:', state.exchangeRate)

      const convertedAmount = (state.fromCurrencyAmount * state.exchangeRate).toFixed(2)
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
    async getCountries (toCurrency) {
      // const response = await this.$http.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
      // return response.data.map(country => country.name)
    }
  }
})
