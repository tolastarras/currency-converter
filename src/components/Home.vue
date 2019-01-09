<template>
  <div class="hello">
    <h1>Welcome</h1>
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    console.log('created...')
    this.getExchangeRate('USD', 'EUR')
  },
  methods: {
    getExchangeRate (fromCurrency, toCurrency) {
      let url = `http://apilayer.net/api/live?access_key=${process.env.VUE_APP_CURRENCY_LAYER_KEY}&currencies=${toCurrency}&source=${fromCurrency}&format=1`
      this.$http.get(url)
        .then(({ data }) => {
          const rate = data.quotes
          console.log(rate)
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
