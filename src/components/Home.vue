<template>
  <div class="hello">
    <h1>Welcome</h1>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      message: ''
    }
  },
  created () {
    this.convertCurrency('USD', 'EUR', 10).then(message => {
      this.message = message
    })
  },
  methods: {
    getExchangeRate (fromCurrency, toCurrency) {
      const API_KEY = process.env.VUE_APP_CURRENCY_LAYER_KEY
      let url = `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${toCurrency}&source=${fromCurrency}&format=1`

      return this.$http.get(url).then(response => response.data.quotes[`${fromCurrency}${toCurrency}`])
    },
    async getCountries (toCurrency) {
      const response = await this.$http.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
      return response.data.map(country => country.name)
    },
    async convertCurrency (fromCurrency, toCurrency, amount) {
      const exchangeRate = await this.getExchangeRate(fromCurrency, toCurrency)
      const countries = await this.getCountries(toCurrency)
      const convertedAmount = (amount * exchangeRate).toFixed(2)

      return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can use these in the following countries: ${countries}`
    }
  }
}
</script>

<style scoped lang="scss">

</style>
