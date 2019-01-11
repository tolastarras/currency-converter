<template>
  <div class="container text-center">
    <h1>Currency Converter</h1>
    <hr>
    <div class="content row">
      <div class="col">
        <message-header />
        <form class="mt-4">
          <!-- <div class="form-row">
            <div class="col">
              <input type="text" class="form-control" placeholder="Amount" v-model="fromCurrencyAmount">
            </div>
            <div class="col">
              <select class="from-currency-js form-control" @change="handleChange('fromCurrency', $event)">
                <option v-for="currency in sortedCurrencies" :key="currency.code" :selected="selectedOption(currency.code, 'fromCurrency')" :value="currency.code">{{ currency.name }}</option>
              </select>
            </div>
          </div> -->
          <div class="form-row mt-2">
            <div class="col">
              <input type="text" class="form-control" placeholder="Amount">
            </div>
            <div class="col">
              <select-box />
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
import { mapState } from 'vuex'
import SelectBox from '@/components/SelectBox'
import MessageHeader from '@/components/MessageHeader'

export default {
  name: 'home',
  components: {
    SelectBox,
    MessageHeader
  },
  data () {
    return {
      currencies: [],
      fromCurrencyAmount: 1,
      toCurrency: 'EUR',
      message: ''
    }
  },
  mounted () {
    this.loadCurrencies().then(currencies => {
      this.$store.dispatch('pushCurrencies', currencies)
    })

    this.convertCurrency('USD', 'EUR', 10).then(message => {
      this.message = message
    })
  },
  computed: {
    sortedCurrencies () {
      let items = this.currencies
      return items.sort((a, b) => a.name < b.name ? -1 : 1)
    }
  },
  methods: {
    // TODO: load currencies from store, if not available from localstorage, else from api
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
    },
    selectedOption (code, type) {
      return code === (type === 'fromCurrency' ? this.fromCurrency : this.toCurrency)
    }
    // currencyName (code) {
    //   let currency = this.currencies.filter(currency => currency.code === code)

    //   // wait for currency to load
    //   if (!currency.length) return

    //   return currency.pop().name
    // }
  }
}
</script>

<style scoped lang="scss">

</style>
