<template>
  <select class="form-control" @change="handleChange">
    <option v-for="currency in currencies" :key="currency.code" :selected="selectedOption">{{ currency.name }}</option>
  </select>  
</template>

<script>
export default {
  data () {
    return {
      currency: {},
      currencies: []
    }
  },
  methods: {
    selectedOption (code, type) {
      return code === (type === 'fromCurrency' ? this.fromCurrency : this.toCurrency)
    },
    handleChange (type, e) {
      this.$$type = e.target.value
    }    
  }
}
</script>
