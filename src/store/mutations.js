export default {
  SET_FROM_CURRENCY (state, payload) {
    state.fromCurrency = payload
  },
  SET_TO_CURRENCY (state, payload) {
    state.toCurrency = payload
  },
  SET_FROM_CURRENCY_AMOUNT (state, amount) {
    state.fromCurrency.amount = amount
  },
  SET_TO_CURRENCY_AMOUNT (state, amount) {
    state.toCurrency.amount = amount
  },
  SET_CURRENCIES (state, currencies) {
    state.currencies = currencies
  },
  SORT_CURRENCIES (state) {
    let items = state.currencies
    // sort currencies in asc order
    state.currencies = items.sort((a, b) => a.name < b.name ? -1 : 1)
  },
  PUSH_CURRENCY (state, currency) {
    state.currencies.push(currency)
  },
  INSERT_CURRENCY (state, { currency, index }) {
    state.currencies.splice(index + 1, 0, currency)
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
  SET_CURRENCY_MAIN_COUNTRY_FLAG (state, { countries, countryIndex, currencyIndex }) {
    // country to move up to the front of the array
    let country = countries[countryIndex]

    // country at position 0 of the array
    let allCountries = state.currencies[currencyIndex].countries
    allCountries[countryIndex] = allCountries[0]
    allCountries[0] = country
  },
  // Set the currency name of a currency in the currencies array at index currencyIndex
  SET_CURRENCY_NAME_BY_INDEX (state, { index, name }) {
    state.currencies[index].name = name
  },
  UPDATE_CURRENCY_NAME (state, { code, name }) {
    state.currencies.map(currency => {
      if (currency.code === code) {
        currency.name = name
      }
    })
  }
}
