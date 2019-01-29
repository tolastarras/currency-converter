import Axios from 'axios'
import stringSimilarity from 'string-similarity'

export default {
  init ({ state, dispatch }) {
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

    // refactor into a function since it is duplicated on customSelectBox component
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
  /**
   * Load currencies on app init from localStorage or API if the localStorage is empty.
   */
  async loadCurrencies ({ state, dispatch, commit }) {
    if (!localStorage.getItem('currencies')) {
      console.log('loading currencies from API ...')
      // load currencies from api
      const response = await Axios.get('https://restcountries.eu/rest/v2/all?fields=name;flag;currencies')
      response.data.map(country => {
        country.currencies.map(currency => {
          // initialize additional fields
          currency = { ...currency, 'countries': [{ name: country.name, flag: country.flag }] }
          // discard currencies with empty or invalid codes
          if (currency.code && currency.code !== '(none)') {
            // Add currency to currencies array or countries to currency countries array if currency already in array.
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
          }
        })
      })

      await dispatch('rearrangeArray')

      // set local storage so on the next call no api call is required
      localStorage.setItem('currencies', JSON.stringify(state.currencies))
    } else {
      commit('SET_CURRENCIES', JSON.parse(localStorage.getItem('currencies')))
    }
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
    let country
    state.currencies.find(currency => {
      if (currency.code === code) {
        country = currency.countries[0]
      }
    })

    return country
  }
}
