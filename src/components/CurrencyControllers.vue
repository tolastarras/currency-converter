<template>
  <form class="mt-4">
    <div class="from-currency-js form-row mb-2">
      <div class="col">
        <input @change="handleInputChange" @input="handleInputChange" type="text" class="form-control" placeholder="Amount" v-model="fromCurrencyAmount">
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
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    handleInputChange ({ target }) {
      console.log('input change ...', target.value)
      this.updateFromCurrencyAmount(target.value)
      // console.log('TYPE:', type)
      // console.log('TARGET:', target.value)
    },
    handleSelectChange () {
      console.log('TYPE:', 'type')
      // let method = (type ==='from-currency' ? 'setFromCurrency' : 'setToCurrency')
      // this.$store.commit(method, event.target.value)
    }    
  },
  computed: {
    ...mapState(['fromCurrency', 'fromCurrencyAmount', 'toCurrency', 'toCurrencyAmount', 'currencies']),
    ...mapActions(['updateFromCurrencyAmount'])
  }  
}
</script>
