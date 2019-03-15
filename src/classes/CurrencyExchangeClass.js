import axios from 'axios'

class CurrencyExchange {
  constructor (baseURL) {
    this.apiClient = axios.create({
      baseURL: `https://${baseURL}`,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.methods = {
      currencies: ['exchangeRate'],
      countries: ['loadCountries']
    }
  }

  exchangeRate (base, toCurrency) {
    return this.apiClient.get(`/api/v1/currency-exchange/${base}/${toCurrency}`)
  }

  loadCountriesData () {
    return this.apiClient.get('/rest/v2/all?fields=name;flag;currencies')
  }
}

export default CurrencyExchange
