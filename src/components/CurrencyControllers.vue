<template>
  <form class="mt-4">
    <div class="from-currency-js form-row mb-2">
      <div class="col">
        <input @input="handleInputChange" type="text" class="form-control" placeholder="Amount" :value="fromCurrencyAmount">
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
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code" :selected="currency.code === toCurrency">
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
  methods: {
    ...mapActions(['updateFromCurrencyAmount']),
    handleInputChange ({ target }) {
      // TODO: only allow numbers and a single decimal point
      // let regex = /^\d+(\\.{1}\d+)?$/
      // if (this.fromCurrencyAmount.toString().match(regex)) {
      // if (!regex.test(e.key)) {//} && e.key !== 'Backspace') {
      //   e.preventDefault()
      // }

      // method name based on select box selected
      let method = (this.isFromCurrency(target) ? 'SET_FROM_CURRENCY_AMOUNT' : 'SET_TO_CURRENCY_AMOUNT')

      this.$store.commit(method, target.value)
      this.getExchangeRate.then(response => console.log(response))
    },
    handleSelectChange ({ target }) {
      // method name based on select box selected
      let method = (this.isFromCurrency(target) ? 'SET_FROM_CURRENCY' : 'SET_TO_CURRENCY')

      // update state
      this.$store.commit(method, target.value)
    },
    isFromCurrency (target) {
      // find parent class of select option
      return target.closest('.form-row').classList.contains('from-currency-js')
    }
  },
  computed: {
    ...mapState(['fromCurrency', 'toCurrency', 'fromCurrencyAmount', 'toCurrencyAmount', 'currencies']),
    ...mapGetters(['getExchangeRate', 'currencyName'])
  }
}
</script>
