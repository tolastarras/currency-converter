import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import stringSimilarity from 'string-similarity'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromCurrency: {
      // amount, code, countries, flag, name, symbol
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
      // let amount = state.fromCurrency.amount
      // state.fromCurrency = { ...payload, amount }
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
      console.log(state.toCurrency)
    },
    SET_CURRENCIES (state, items) {
      // sort currencies in asc order
      state.currencies = items.sort((a, b) => a.name < b.name ? -1 : 1)
    },
    PUSH_CURRENCY (state, currency) {
      state.currencies.push(currency)
    },
    PUSH_TO_COUNTRIES (state, { index, payload }) {
      state.currencies[index].countries.push(payload)
    },
    SET_EXCHANGE_RATE (state, amount) {
      state.exchangeRate = amount
      // set toCurrencyAmount at loading
      if (state.toCurrencyAmount === 0) {
        state.toCurrencyAmount = amount
      }
    },
    SET_CURRENCY_MAIN_COUNTRY (state, { countries, countryIndex, currencyIndex }) {
      // country to move up to the front of the array
      let country = countries[countryIndex]

      // country at position 0 of the array
      let allCountries = state.currencies[currencyIndex].countries
      allCountries[countryIndex] = allCountries[0]
      allCountries[0] = country
    }
  },
  actions: {
    init ({ state, dispatch, commit }) {
      // load currencies from local storage or api
      dispatch('loadCurrencies')
      // exchange rate for the default currencies USD to EUR
      dispatch('updateExchangeRate')
      // initialize extra values to the fromCurrency and toCurrency objects
      dispatch('updateFromCurrencyByCode', state.fromCurrency.code)
      dispatch('updateToCurrencyByCode', state.toCurrency.code)
      // calculate currency conversion
      dispatch('convertToCurrency', state.fromCurrency.amount)
    },
    updateFromCurrency ({ commit, dispatch }, currency) {
      commit('SET_FROM_CURRENCY', currency)
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
      commit('SET_FROM_CURRENCY', { ...payload, amount: state.fromCurrency.amount })
    },
    async updateToCurrencyByCode ({ state, commit, dispatch }, code) {
      let payload = await dispatch('currencyPaylod', code)
      commit('SET_TO_CURRENCY', { ...payload, amount: state.toCurrency.amount })
    },
    async currencyPaylod ({ state, dispatch }, code) {
      // get currency index from currencies array by currency code
      let index = await dispatch('getCurrencyIndexByCurrencyCode', code)
      let currency = state.currencies[index]

      // initialize flag value
      // TODO: The line below GENERATES AN ERROR FIRST TIME ON LOADCURRENCIES
      let flag = currency.countries[0].flag

      if (code.toLowerCase() === 'eur') {
        flag = require('@/assets/flags/europe.svg')
      }

      return { ...currency, flag }
    },
    updateFromCurrencyAmount ({ commit, dispatch }, amount) {
      dispatch('convertToCurrency', amount)
    },
    updateToCurrencyAmount ({ commit, dispatch }, amount) {
      dispatch('convertFromCurrency', amount)
    },
    async loadCurrencies ({ state, dispatch, commit }) {
      if (!localStorage.getItem('currencies')) {
        console.log('loading currencies from API ...')
        // load currencies from api
        const response = await Axios.get('https://restcountries.eu/rest/v2/all?fields=name;flag;currencies')
        response.data.map(country => {
        // json.map(country => {
          country.currencies.map(currency => {
            // initialize additional fields
            currency = { ...currency, 'countries': [{ name: country.name, flag: country.flag }] }
            // discard currencies with empty or invalid codes
            if (currency.code && currency.code !== '(none)') {
              // dispatch('addCurrencyToCurrenciesArray', { country, currency })
              // **********************
              // discard duplicate currencies
              let index = state.currencies.findIndex(element => {
                return element.code === currency.code
              })

              // currency found at position index
              if (index > 0) {
                let payload = { name: country.name, flag: country.flag }
                // add country to currency countries array
                commit('PUSH_TO_COUNTRIES', { index, payload })
              } else {
                // currency not in the array yet
                commit('PUSH_CURRENCY', currency)
              }

              dispatch('rearrangeArray')
            }
          })
        })

        // set local storage so on the next call no api call is required
        localStorage.setItem('currencies', JSON.stringify(state.currencies))
      } else {
        commit('SET_CURRENCIES', JSON.parse(localStorage.getItem('currencies')))
        // TEMPORARY
        dispatch('rearrangeArray')
      }
    },
    indexOfCurrency ({ state }, code) {
      return state.currencies.findIndex(element => {
        return element.code === code
      })
    },
    /**
     * Add currency to currencies array or countries to currency countries array if currency already in array.
     */
    async addCurrencyToCurrenciesArray ({ state, commit, dispatch }, { country, currency }) {
      // discard duplicate currencies
      // let index = await dispatch('indexOfCurrency', currency.code)
      console.log('CODE', currency.code)
      console.log('CURRENCIES', state.currencies)

      let index = await state.currencies.findIndex(element => {
        console.log('SSSSSSSSSSSSSSSSSSS', element)
        console.log('ELEMENT', element.code)
        console.log('CODE', currency.code)
        return element.code === currency.code
      })
      console.log('INDEX', index)

      // currency found at position index
      if (index > 0) {
        // add country to currency countries array
        commit('PUSH_TO_COUNTRIES', [index, { name: country.name, flag: country.flag }])
      } else {
        // currency not in the array yet
        commit('PUSH_CURRENCY', currency)
      }

      // this.rearrangeArray()
    },
    /**
     * Move main flag in front of array for easier handling.
     * for example: United States flag for USD currencies
     */
    rearrangeArray ({ state, dispatch, commit }) {
      state.currencies.map((currency, position) => {
        if (currency.countries.length > 1) {
          dispatch('bestMatchIndex', currency).then(countryIndex => {
            if (countryIndex > 0) {
              commit('SET_CURRENCY_MAIN_COUNTRY', { countries: currency.countries, countryIndex, currencyIndex: position })
            }
          })
        }
      })
    },
    bestMatchIndex ({ state }, currency) {
      // array of countries that share the same currency
      let countries = currency.countries.map(country => country.name)
      let matches = stringSimilarity.findBestMatch(currency.name, countries)
      // guessed flag country
      let possibleCountry = matches.bestMatch.target

      // find country in array of countries
      return countries.findIndex(country => country === possibleCountry)
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

      return country
    }
  },
  getters: {
    currencies (state) {
      return state.currencies
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
