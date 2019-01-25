<template>
  <form class="mt-4">
    <div class="from-currency-js form-row mb-2">
      <div class="col">
        <input @keypress="handleKeyPress" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" :value="fromCurrencyAmount">
      </div>
      <div class="col">
        <select class="form-control selectpicker" @change="handleSelectChange">
          <option v-for="currency in currencies" data-content="<img src='https://restcountries.eu/data/esp.svg'>" :key="currency.code" :value="currency.code" :selected="currency.code === fromCurrency">
            {{ currency.name }} : {{ currency.symbol }}
          </option>
        </select>
      </div>
    </div>
    <div class="to-currency-js form-row">
      <div class="col">
        <input @keypress="handleKeyPress" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" :value="toCurrencyAmount">
      </div>
      <div class="col">
        <select class="form-control" @change="handleSelectChange">
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code" :selected="currency.code === toCurrency">
            {{ currency.name }} : {{ currency.symbol }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <custom-select-box />
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CustomSelectBox from '@/components/CustomSelectBox'

export default {
  components: {
    CustomSelectBox
  },
  methods: {
    ...mapActions(['updateFromCurrencyAmount', 'updateToCurrencyAmount']),
    handleKeyPress (e) {
      // handle both text boxes
      // let className = '.' + (e.target.parentNode.parentNode.classList.contains('from-currency-js') ? 'from-currency-js' : 'to-currency-js')
      let className = '.' + (this.isFromCurrency(e.target) ? 'from-currency-js' : 'to-currency-js')

      let input = document.querySelector(className + ' input').value
      let validKey = /[\d|.]/

      // TODO: try to redo with a regular expression
      if (!validKey.test(e.key) || (e.key === '.' && input.includes('.')) || (input.charAt(0) === '0' && input.length === 1 && e.key !== '.')) {
        e.preventDefault()
      }
    },
    handleInputChange ({ target }) {
      // method name based on drop box selected
      let method = (this.isFromCurrency(target) ? 'updateFromCurrencyAmount' : 'updateToCurrencyAmount')

      this.$store.dispatch(method, target.value)
    },
    handleSelectChange ({ target }) {
      // method name based on select box selected
      let method = (this.isFromCurrency(target) ? 'updateFromCurrency' : 'updateToCurrency')

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
