export default {
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
