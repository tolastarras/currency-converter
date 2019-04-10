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
  }

  loadCountriesData () {
    return this.apiClient.get('/rest/v2/all?fields=name;flag;currencies')
  }
}

export default CurrencyExchange
