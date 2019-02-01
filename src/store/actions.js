import Axios from 'axios'
import stringSimilarity from 'string-similarity'

export default {
  async init ({ state, dispatch }) {
    // load currencies from local storage or api
    await dispatch('loadCurrencies')
    // initialize extra values to the fromCurrency and toCurrency objects
    dispatch('updateFromCurrencyByCode', state.fromCurrency.code)
    dispatch('updateToCurrencyByCode', state.toCurrency.code)
    // exchange rate for the default currencies USD to EUR
    dispatch('updateExchangeRate')
  },
  async updateFromCurrencyByCode ({ state, commit, dispatch }, code) {
    let payload = await dispatch('currencyPaylod', code)
    commit('SET_FROM_CURRENCY', { ...payload, amount: state.fromCurrency.amount })
    dispatch('updateExchangeRate')
  },
  async updateToCurrencyByCode ({ state, commit, dispatch }, code) {
    let payload = await dispatch('currencyPaylod', code)
    commit('SET_TO_CURRENCY', { ...payload, amount: state.toCurrency.amount })
    dispatch('updateExchangeRate')
  },
  async currencyPaylod ({ state, dispatch }, code) {
    // get currency index from currencies array by currency code
    let index = await dispatch('getCurrencyIndexByCurrencyCode', code)

    return state.currencies[index]
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
          currency = { ...currency, 'countries': [{ name: this.$root.formatCountryName(country.name), flag: country.flag }] }
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

      await dispatch('rearrangeArray')

      // set local storage so on the next call no api call is required
      localStorage.setItem('currencies', JSON.stringify(state.currencies))
    } else {
      commit('SET_CURRENCIES', JSON.parse(localStorage.getItem('currencies')))
    }
  },
  async updateExchangeRate ({ state, commit, dispatch }) {
    const url = `http://free.currencyconverterapi.com/api/v5/convert?q=${state.fromCurrency.code}_${state.toCurrency.code}&compact=y`
    const response = await Axios.get(url)
    const exchangeRate = response.data[`${state.fromCurrency.code}_${state.toCurrency.code}`].val

    // random decimal for testing purposes
    commit('SET_EXCHANGE_RATE', Math.random() * exchangeRate)
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
