import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://${process.env.VUE_APP_BASE_API_URL_PROD}`,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  exchangeRate (base, toCurrency) {
    return apiClient.get(`/api/v1/currency-exchange/${base}/${toCurrency}`)
  }
}
