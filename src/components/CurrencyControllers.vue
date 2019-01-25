<template>
  <form class="mt-4">
    <div class="from-currency-js form-row mb-2">
      <div class="col">
        <input @keypress="handleKeyPress" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" :value="fromCurrencyAmount">
      </div>
      <div class="col">
        <select class="form-control" @change="handleSelectChange">
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code" :selected="currency.code === fromCurrency">
            {{ currency.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="to-currency-js form-row">
      <div class="col">
        <input @change="handleInputChange" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" v-model="toCurrencyAmount">
      </div>
      <div class="col">
        <select class="form-control" @change="handleSelectChange">
          <option data-thumbnail="https://restcountries.eu/data/esp.svg" v-for="currency in currencies" :key="currency.code" :value="currency.code" :selected="currency.code === toCurrency">
            {{ currency.name }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      amount: '',
      isValidInput: true
    }
  },
  methods: {
    ...mapActions(['updateFromCurrencyAmount', 'updateToCurrencyAmount']),
    handleKeyPress (e) {
      let input = document.querySelector('.from-currency-js input').value
      let validKey = /[\d|.]/

      // TODO: try to redo with a regular expression
      if (!validKey.test(e.key) || (e.key === '.' && input.includes('.')) || (input.charAt(0) === '0' && input.length === 1 && e.key !== '.')) {
        this.isValidInput = false
        e.preventDefault()
      }
    },
    handleInputChange (e) {
      // method name based on select box selected
      let method = (this.isFromCurrency(e.target) ? 'updateFromCurrencyAmount' : 'updateToCurrencyAmount')
      console.log('METHOD:', method)

      // this.$store.commit(method, target.value)
      this.$store.dispatch(method, e.target.value)
      // this.convertCurrency().then(response => console.log('RESPONSE:', response))
      // this.exchangeRate.then(response => console.log(response))
    },
    handleSelectChange ({ target }) {
      // method name based on select box selected
      let method = (this.isFromCurrency(target) ? 'updateFromCurrency' : 'updateToCurrency')

      console.log('METHOD:', method)
      // update state
      this.$store.dispatch(method, target.value)
    },
    isFromCurrency (target) {
      // find parent class of select option
      return target.closest('.form-row').classList.contains('from-currency-js')
    }
  },
  computed: {
    ...mapState(['fromCurrency', 'toCurrency', 'fromCurrencyAmount', 'toCurrencyAmount', 'currencies', 'exchangeRate']),
    ...mapGetters(['currencyName'])
  }
}
</script>
