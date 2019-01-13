<template>
  <div class="container">
    <h4>{{ fromCurrencyAmount }} {{ currencyName(fromCurrency) }} equals</h4>
    <h1>{{ toCurrencyAmount }} {{ currencyName(toCurrency) }}</h1>
    {{ currentDate }}
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currencyName']),
    ...mapState(['fromCurrency', 'toCurrency', 'fromCurrencyAmount', 'toCurrencyAmount']),
    currentDate () {
      // let date = new Date
      return 'Jan 9, 2:34AM EST'
    }
  }
}
</script>
