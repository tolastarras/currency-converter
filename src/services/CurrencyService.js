import Api from '@/classes/ApiClientClass'

export default {
  exchangeRate (base, toCurrency) {
    const baseUrl = `https://${process.env.VUE_APP_CURRENCIES_API_URL}`
    const path = `/api/v1/currency-exchange/${base}/${toCurrency}`

    return new Api().client(baseUrl).get(path)
  }
}
