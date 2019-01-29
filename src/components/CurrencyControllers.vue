<template>
  <form class="mt-4">
    <div class="from-currency-js form-row mb-2">
      <div class="col col-md-12 col-lg-7">
        <custom-select-box :currencyType="fromCurrency" />
      </div>
      <div class="col col-md-12 col-lg-5">
        <input @keypress="handleKeyPress" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" :value="fromCurrency.amount">
      </div>
    </div>
    <div class="to-currency-js form-row">
      <div class="col col-md-12 col-lg-7">
        <custom-select-box :currencyType="toCurrency" />
      </div>
      <div class="col col-md-12 col-lg-5">
        <input @keypress="handleKeyPress" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" :value="toCurrency.amount">
      </div>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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

      // text box inputs should contain only digits and at most one decimal point
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
    ...mapState(['fromCurrency', 'toCurrency', 'currencies', 'exchangeRate'])
  }
}
</script>

<style lang="scss" scoped>
input {
  min-height: 40px;
  color: orangered;
  font-size: 1.5em;
  font-weight: 500;
}
</style>
