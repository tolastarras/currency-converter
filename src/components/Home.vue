<template>
  <div class="hello">
    <h1>Welcome</h1>
    {{ exchangeRate }}
    <ul v-for="country in countries" v-bind:key="country">
      <li>{{ country }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      exchangeRate: 0,
      countries: []
    }
  },
  created () {
    this.exchangeRate = this.getExchangeRate('USD', 'EUR')
    console.log('countries', this.getCountries('EUR'))
  },
  methods: {
    getExchangeRate (fromCurrency, toCurrency) {
      const API_KEY = process.env.VUE_APP_CURRENCY_LAYER_KEY
      let url = `http://apilayer.net/api/live?access_key=${API_KEY}&currencies=${toCurrency}&source=${fromCurrency}&format=1`
      this.$http.get(url).then(response => {
        this.exchangeRate = response.data.quotes[`${fromCurrency}${toCurrency}`]
      })
    },
    async getCountries (toCurrency) {
      const response = await this.$http.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
      this.countries = response.data.map(country => country.name)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
