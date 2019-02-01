export default {
  currencyCountries (state) {
    let countries = []
    state.currencies.filter(currency => {
      if (currency.code === state.toCurrency.code) {
        countries = currency.countries
      }
    })

    return countries
  },
  currencyFlag (currency) {
    console.log('CURRENCY:', currency)
    // if (currency.code.toLowerCase() === 'eur') {
    //   return require('@/assets/flags/europe.svg')
    // }

    return 'test' //currency.countries[0].flag
  }  
}
