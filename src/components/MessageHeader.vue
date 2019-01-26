<template>
  <div class="container">
    <h5 class="text-primary">1 {{ fromCurrency.name }} equals</h5>
    <h1>{{ exchangeRate }} {{ toCurrency.name }}</h1>
    <p class="text-muted">{{ currentDate }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['fromCurrency', 'toCurrency', 'exchangeRate']),
    currentDate () {
      let date = new Date()

      let tokens = date.toString().split(' ')
      let timeTokens = tokens[4].split(':')

      let ampm = 'AM'
      let hour = timeTokens[0]

      // validate hour and ampm values guessed above
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
