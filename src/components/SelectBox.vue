<template>
  <select class="form-control" @change="handleChange">
    <option v-for="currency in currencies" :key="currency.code" :selected="selectedOption(currency.code)">
      {{ currency.name }}
    </option>
  </select>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    selectedOption (code) {
      // return code === (type === 'fromCurrency' ? this.fromCurrency : this.toCurrency)
      return code === this.fromCurrency
    },
    handleChange (type, e) {
      // this.$$type = e.target.value
      console.log('handle change')
    }
  },
  computed: {
    ...mapState(['fromCurrency', 'currencies'])
  }
}
</script>
