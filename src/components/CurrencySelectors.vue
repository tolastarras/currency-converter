<template>
  <form class="mt-4">
    <div class="from-currency-js form-row mb-2">
      <div class="col col-12 col-lg-7 mb-1">
        <custom-select-box :currencyType="fromCurrency" :isDisabled="readOnly" />
      </div>
      <div class="col col-12 col-lg-5 mb-1">
        <input @keypress="handleKeyPress" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" :value="fromCurrency.amount" :readonly="readOnly">
      </div>
    </div>
    <div class="to-currency-js form-row">
      <div class="col col-12 col-lg-7 mb-1">
        <custom-select-box :currencyType="toCurrency" :isDisabled="readOnly" />
      </div>
      <div class="col col-12 col-lg-5 mb-1">
        <div v-if="loading" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
          <input @keypress="handleKeyPress" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" :value="toCurrency.amount" :readonly="readOnly">
        </div>
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
      let className = '.' + (this.$root.isFromCurrency(e.target) ? 'from-currency-js' : 'to-currency-js')

      let input = document.querySelector(className + ' input').value
      let validKey = /[\d|.]/

      // text box inputs should contain only digits and at most one decimal point
      if (!validKey.test(e.key) || (e.key === '.' && input.includes('.')) || (input.charAt(0) === '0' && input.length === 1 && e.key !== '.')) {
        e.preventDefault()
      }
    },
    handleInputChange ({ target }) {
      // method name based on drop box selected
      let method = (this.$root.isFromCurrency(target) ? 'updateFromCurrencyAmount' : 'updateToCurrencyAmount')

      this.$store.dispatch(method, target.value)
    },
    handleSelectChange ({ target }) {
      // method name based on select box selected
      let method = (this.$root.isFromCurrency(target) ? 'updateFromCurrency' : 'updateToCurrency')

      // update state
      this.$store.dispatch(method, target.value)
    }
  },
  computed: {
    ...mapState(['fromCurrency', 'toCurrency', 'currencies', 'exchangeRate', 'loading']),
    ...mapGetters('conversions', ['hasMore']),
    readOnly () {
      return !this.hasMore
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/currency-selectors.scss';
</style>
