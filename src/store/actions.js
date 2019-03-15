import stringSimilarity from 'string-similarity'
import CurrencyExchange from '@/classes/CurrencyExchangeClass'

export default {
  async init ({ state, dispatch }) {
    console.log('init...')
    // load currencies from local storage or api
    await dispatch('loadCurrencies')

    // initialize extra values to the fromCurrency and toCurrency objects
    // dispatch('updateFromCurrencyByCode', state.fromCurrency.code)
    // dispatch('updateToCurrencyByCode', state.toCurrency.code)
  },
  async updateFromCurrencyByCode ({ state, commit, dispatch }, code) {
    let payload = await dispatch('currencyPayload', code)
    commit('SET_FROM_CURRENCY', { ...payload, amount: state.fromCurrency.amount })
    // do not run on init to avoid multiple api requests
    if (state.toCurrency.amount) {
      dispatch('updateExchangeRate')
    }
  },
  async updateToCurrencyByCode ({ state, commit, dispatch }, code) {
    let payload = await dispatch('currencyPayload', code)
    commit('SET_TO_CURRENCY', { ...payload, amount: state.toCurrency.amount })
    dispatch('updateExchangeRate')
  },
  async currencyPayload ({ state, dispatch }, code) {
    // get currency index from currencies array by currency code
    let index = await dispatch('getCurrencyIndexByCurrencyCode', code)

    return state.currencies[index]
  },
  /**
   * Load currencies on app init from localStorage or API if the localStorage is empty.
   */
  async loadCurrencies ({ state, dispatch, commit }) {
    console.log('load currencies ...')
    if (!localStorage.getItem('currencies')) {
      // load currencies from api
      console.log('load currencies from api >>>')
      dispatch('loadDataFromApi')

      // set local storage so on the next call no api call is required
      localStorage.setItem('currencies', JSON.stringify(state.currencies))
    } else {
      commit('SET_CURRENCIES', JSON.parse(localStorage.getItem('currencies')))
    }
  },
  async loadDataFromApi ({ state, commit, dispatch }) {
    const currency = new CurrencyExchange(process.env.VUE_APP_COUNTRIES_API_URL)
    const response = await currency.loadCountriesData()
    console.log(response)

    response.data.map(country => {
      country.currencies.map(currency => {
        // initialize additional fields
        currency = { ...currency, countries: [{ name: country.name, flag: country.flag }] }
        // discard currencies with empty or invalid codes
        if (currency.code && currency.code !== '(none)') {
          // discard duplicate currencies: add currency to currencies array or countries to currency countries array if currency already in array.
          let index = state.currencies.findIndex(element => element.code === currency.code)
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

    // American Samoa is the first country in the response array and its currency name is incorrectly written in the API.
    let index = await dispatch('getCurrencyIndexByCurrencyCode', 'USD')
    commit('SET_CURRENCY_NAME_BY_INDEX', { index, name: 'United States Dollar' })

    // bring main currency country to the front of the currency.countries array
    await dispatch('rearrangeArray')

    // sort currencies
    commit('SORT_CURRENCIES')
    console.log('here...')
  },
  async updateExchangeRate ({ state, commit, dispatch }) {
    try {
      const baseCode = state.fromCurrency.code.toLowerCase()
      const toCode = state.toCurrency.code.toLowerCase()

      const currency = new CurrencyExchange(process.env.VUE_APP_CURRENCIES_API_URL)

      let exchangeRate = await currency.exchangeRate(baseCode, toCode)
        .then(response => response.data.rate.toFixed(4))

      commit('SET_EXCHANGE_RATE', exchangeRate)
      dispatch('convertToCurrency', state.fromCurrency.amount)
    } catch (err) {
      console.log('[ERROR]', err)
    }
  },
  updateFromCurrency ({ commit, dispatch }, currency) {
    commit('SET_FROM_CURRENCY', currency)
    // dispatch('updateExchangeRate')
  },
  updateToCurrency ({ commit, dispatch }, code) {
    commit('SET_TO_CURRENCY', code)
    // dispatch('updateExchangeRate')
  },
  updateFromCurrencyName ({ state, commit }, code) {
    let currency = state.currencies.filter(currency => currency.code === code)
    commit('SET_FROM_CURRENCY_NAME', currency[0].name)
  },
  updateToCurrencyName ({ state, commit }, code) {
    let currency = state.currencies.filter(currency => currency.code === code)
    commit('SET_TO_CURRENCY_NAME', currency[0].name)
  },
  updateFromCurrencyAmount ({ commit, dispatch }, amount) {
    dispatch('convertToCurrency', amount)
  },
  updateToCurrencyAmount ({ commit, dispatch }, amount) {
    dispatch('convertFromCurrency', amount)
  },
  convertFromCurrency ({ state, commit }, amount) {
    let convertedAmount = amount / state.exchangeRate
    commit('SET_FROM_CURRENCY_AMOUNT', convertedAmount)
    commit('SET_TO_CURRENCY_AMOUNT', amount)
  },
  convertToCurrency ({ state, commit }, amount) {
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
  }
}
