<template>
  <div class="container text-center">
    <h1>Currency Converter</h1>
    <hr>
    <div class="content row">
      <div class="col">
        <message-header />
        <div class="row">
          <div class="col col-md-8 offset-md-2">
            <currency-controllers />
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      {{ message }}
    </div>
  </div>
</template>

<script>
import CurrencyControllers from '@/components/CurrencyControllers'
import MessageHeader from '@/components/MessageHeader'

export default {
  name: 'home',
  components: {
    CurrencyControllers,
    MessageHeader
  },
  data () {
    return {
      currencies: [],
      fromCurrencyAmount: 1,
      message: ''
    }
  },
  mounted () {
    this.message = 'Countries that accept this currency'

    this.loadCurrencies().then(currencies => {
      this.$store.dispatch('pushCurrencies', currencies)
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
        console.log('rest call to api ...')
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
    }
  }
}
</script>
