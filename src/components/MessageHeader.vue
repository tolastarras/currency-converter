<template>
  <div class="container">
    <h4 class="text-white">1 {{ fromCurrency.name }} equals</h4>
    <div v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <h1>{{ exchangeRate }} {{ toCurrency.name }}</h1>
    </div>
    <p class="text-warning">{{ currentDate }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['fromCurrency', 'toCurrency', 'exchangeRate', 'loading']),
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
