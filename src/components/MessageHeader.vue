<template>
  <div class="container">
    <!-- <h4>{{ fromCurrencyAmount }} {{ currencyName(fromCurrency) }} equals</h4>
    Jan 9, 3:22AM EST -->
    <h4>1 {{ currencyName(fromCurrency) }} equals</h4>
    <h1>0.86 {{ currencyName(toCurrency) }}</h1>
    Jan 9, 2:22AM EST
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currencyName']),
    ...mapState(['fromCurrency', 'toCurrency'])
  }
}
</script>

<style>

</style>
