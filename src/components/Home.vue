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
                <option v-for="currency in sortedCurrencies" :key="currency.code">{{ currency.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-row mt-2">
            <div class="col">
              <input type="text" class="form-control" placeholder="Amount">
            </div>
            <div class="col">
              <select class="form-control">
                <option v-for="currency in sortedCurrencies" :key="currency.code">{{ currency.name }}</option>
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
      currencies: [],
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      message: ''
    }
  },
  mounted () {
    this.loadCurrencies().then(currencies => {
      this.currencies = currencies
    })

    this.convertCurrency('USD', 'EUR', 10).then(message => {
      this.message = message
    })
  },
  computed: {
    sortedCurrencies () {
      return this.currencies.sort((a, b) => {
        return a.name < b.name ? -1 : 1
      })
    }
  },
  methods: {
    async loadCurrencies () {
      if (!localStorage.getItem('currencies')) {
        const response = await this.$http.get('https://restcountries.eu/rest/v2/all?fields=currencies')
        const elements = []

        // response data
        response.data.map(({ currencies }) => {
          // currencies array
          currencies.map(currency => {
            // discard currencies with empty or invalid codes
            if (currency.code && currency.code !== '(none)') {
              // discard duplicates
              let hasCurrency = elements.find(element => element.code === currency.code)

              if (!hasCurrency) {
                elements.push(currency)
              }
            }
          })
        })

        localStorage.setItem('currencies', JSON.stringify(elements))
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
