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
      let date = new Date()

      let tokens = date.toString().split(' ')
      let timeTokens = tokens[4].split(':')

      let ampm = 'AM'
      let hour = timeTokens[0]

      // validate hour and ampm values guessed
      if (timeTokens[0] > 12) {
        hour = timeTokens[0] - 12
        ampm = 'PM'
      }

      let time = `${hour}:${timeTokens[1]}${ampm} EST`

      return `${tokens[1]} ${tokens[2]}, ${time}`
    }
  }
}
</script>
