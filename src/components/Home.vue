<template>
  <div class="container text-center">
    <h1>Currency Converter</h1>
    <hr>
    <div class="content row">
      <div class="col">
        <h4>1 United States Dollar equals</h4>
        <h1>0.86 Euro</h1>
        Jan 9, 3:22AM EST
        <form class="mt-4">
          <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Amount">
            </div>
            <div class="col">
              <select class="form-control">
                <option v-for="currency in currencies" :key="currency">{{ currency }}</option>
              </select>
            </div>
          </div>
          <div class="form-row mt-2">
            <div class="col">
              <input type="text" class="form-control" placeholder="Amount">
            </div>
            <div class="col">
              <select class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="pt-5">
      {{ message }}
    </div>
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
  mounted () {
    this.convertCurrency('USD', 'EUR', 10).then(message => {
      this.message = message
    })
  },
  asyncComputed: {
    async currencies () {
      let currencies = []
      await this.loadCurrencies().then(records => {
        records.map(record => {
          let name = record.currencies[0].name
          if (name && currencies.indexOf(name) === -1) {
            currencies.push(name)
          }
        })
      })

      return currencies
    }
  },
  methods: {
    async loadCurrencies () {
      if (!localStorage.getItem('currencies')) {
        const response = await this.$http.get('https://restcountries.eu/rest/v2/all?fields=currencies')
        localStorage.setItem('currencies', JSON.stringify(response.data))
      }

      return JSON.parse(localStorage.getItem('currencies'))
    },
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
