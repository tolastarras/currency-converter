import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromCurrency: {
      code: 'USD',
      amount: 1
    },
    toCurrency: {
      code: 'EUR'
    },
    exchangeRate: 0,
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
    SET_FROM_CURRENCY_NAME (state, name) {
      state.fromCurrency.name = name
    },
    SET_FROM_CURRENCY_CODE (state, code) {
      state.fromCurrency.code = code
    },
    SET_TO_CURRENCY_NAME (state, name) {
      state.toCurrency.name = name
    },
    SET_FROM_CURRENCY_AMOUNT (state, amount) {
      state.fromCurrency.amount = amount
    },
    SET_TO_CURRENCY_AMOUNT (state, amount) {
      state.toCurrency.amount = amount
    },
    SET_FROM_CURRENCY_FLAG (state, flag) {
      state.fromCurrency.flag = flag
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
    init ({ state, dispatch, commit }) {
      dispatch('loadCurrencies').then(elements => {
        // set store currencies
        commit('SET_CURRENCIES', elements)
        dispatch('updateExchangeRate')

        dispatch('updateFromCurrencyByCode', state.fromCurrency.code)
        dispatch('updateToCurrencyName', state.toCurrency.code)
        dispatch('convertToCurrency', state.fromCurrency.amount)
        dispatch('updateFromCurrencyFlag', state.fromCurrency.code)
      })
    },
    updateFromCurrency ({ commit, dispatch }, currency) {
      commit('SET_FROM_CURRENCY', currency)
      // dispatch('updateFromCurrencyName', code)
      dispatch('updateExchangeRate')
    },
    updateToCurrency ({ commit, dispatch }, code) {
      commit('SET_TO_CURRENCY', code)
      dispatch('updateExchangeRate')
    },
    updateFromCurrencyName ({ state, commit }, code) {
      let currency = state.currencies.filter(currency => currency.code === code)
      commit('SET_FROM_CURRENCY_NAME', currency[0].name)
    },
    updateToCurrencyName ({ state, commit }, code) {
      let currency = state.currencies.filter(currency => currency.code === code)
      commit('SET_TO_CURRENCY_NAME', currency[0].name)
    },
    async updateFromCurrencyByCode ({ state, commit, dispatch }, code) {
      let payload = await dispatch('currencyPaylod', code)
      commit('SET_FROM_CURRENCY', payload)
    },
    async updateToCurrencyByCode ({ commit, dispatch }, code) {
      let payload = await dispatch('currencyPaylod', code)
      commit('SET_TO_CURRENCY', payload)
    },
    async currencyPaylod ({ state, dispatch }, code) {
      let index = await dispatch('getCurrencyIndexByCurrencyCode', code)
      let currency = state.currencies[index]
      let payload = {
        ...currency,
        flag: currency.countries[0].flag
      }

      return payload
    },
    updateFromCurrencyAmount ({ commit, dispatch }, amount) {
      dispatch('convertToCurrency', amount)
    },
    updateToCurrencyAmount ({ commit, dispatch }, amount) {
      dispatch('convertFromCurrency', amount)
    },
    updateFromCurrencyFlag ({ state, commit }, code) {
      let currency = state.currencies.filter(currency => currency.code === code)

      // wait for currency to load
      // if (!currency.length) return

      // countries array
      let countries = currency[0].countries
      // console.log('COUNTRIES:', countries)

      let index = 0
      // if (code.toLowerCase() === 'usd') {
      //   countries.filter((country, i) => {
      //     if (country.name === 'United States of America') {
      //       index = i
      //     }
      //   })
      // }

      // if (code.toLowerCase() === 'eur') {
      //   console.log('EURO >> display european flag ...')
      // }
      // console.log('index: ' + index)

      commit('SET_FROM_CURRENCY_FLAG', countries[index].flag)
    },
    async loadCurrencies ({ commit, dispatch }) {
      let elements = []

      if (!localStorage.getItem('currencies')) {
        console.log('loading currencies from API ...')

        // load currencies from api
        const response = await Axios.get('https://restcountries.eu/rest/v2/all?fields=name;flag;currencies')

        response.data.map(record => {
          record.currencies.map(currency => {
            // initialize additional fields
            currency = { ...currency, 'countries': [{ name: record.name, flag: record.flag }] }
            // discard currencies with empty or invalid codes
            if (currency.code && currency.code !== '(none)') {
              // discard duplicates
              let hasCurrency = elements.find(element => {
                if (element.code === currency.code) {
                  // add country to currency countries array
                  element.countries.push({ name: record.name, flag: record.flag })

                  return true
                }

                return false
              })

              // currency not in the array yet
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

      return elements
    },
    async updateExchangeRate ({ state, commit, dispatch }) {
      // console.log('UPDATE EXCHANGE RATE:', state.fromCurrency, state.toCurrency, state.fromCurrencyAmount, state.toCurrencyAmount)
      // const API_KEY = process.env.VUE_APP_CURRENCY_LAYER_KEY
      // let url = `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${state.toCurrency}&source=${state.fromCurrency}&format=1`

      // const response = await Axios.get(url)
      // return response.data.quotes[`${state.fromCurrency}${state.toCurrency}`]

      // random decimal for testing purposes
      commit('SET_EXCHANGE_RATE', (Math.random() * 5).toFixed(2))
      // dispatch('convertToCurrency')
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
    },
    getCurrencyIndexByCurrencyCode ({ state }, code) {
      return state.currencies.findIndex(currency => currency.code === code)
    },
    getMainCountryByCurrencyCode ({ state }, code) {
      console.log('CURRENCIES:', state.currencies)
      let country
      state.currencies.find(currency => {
        if (currency.code === code) {
          country = currency.countries[0]
        }
      })

      console.log('COUNTRY:', country)

      return country
    }
  },
  getters: {
    currencies (state) {
      return state.currencies
    },
    // currencyName: (state) => (code) => {
    //   return new Promise(resolve => {
    //     state.currencies.filter(currency => currency.code === code)
    //     console.log(currency[0].name)
    //     resolve(currency[0].name)
    //   })
    //   // let currency = state.currencies.filter(currency => currency.code === code)
    //   // // wait for currency to load
    //   // if (!currency.length) return

    //   // console.log('currency', currency)

    //   // return currency.pop().name
    // },
    currencyFlag: (state) => (code) => {
      let currency = state.currencies.filter(currency => currency.code === code)

      // wait for currency to load
      if (!currency.length) return

      // countries array
      let countries = currency.pop().countries
      // console.log('COUNTRIES:', countries)

      let index = 0
      if (code.toLowerCase() === 'usd') {
        countries.filter((country, i) => {
          if (country.name === 'United States of America') {
            index = i
          }
        })
      }

      if (code.toLowerCase() === 'eur') {
        console.log('EURO >> display european flag ...')
      }
      console.log('index: ' + index)

      return countries[index].flag
    },
    async getCountries (toCurrency) {
      // const response = await this.$http.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
      // return response.data.map(country => country.name)
    },
    currencyCountries (state) {
      let countries = []
      state.currencies.filter(currency => {
        if (currency.code === state.toCurrency.code) {
          countries = currency.countries
        }
      })

      return countries
    }
  }
})
