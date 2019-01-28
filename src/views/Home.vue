<template>
  <div class="container text-center my-5">
    <h1>Currency Converter</h1>
    <hr>
    <div class="contentk row">
      <div class="col">
        <message-header />
        <div class="row">
          <div class="col col-md-8 offset-md-2">
            <currency-controllers />
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-5" v-show="hasMultipleCountries">
      <country-list />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import stringSimilarity from 'string-similarity'

import CurrencyControllers from '@/components/CurrencyControllers'
import MessageHeader from '@/components/MessageHeader'
import CountryList from '@/components/CountryList'

export default {
  name: 'home',
  components: {
    CurrencyControllers,
    MessageHeader,
    CountryList
  },
  computed: {
    ...mapState(['toCurrency']),
    hasMultipleCountries () {
      return this.toCurrency.countries && this.toCurrency.countries.length > 1
    }
  }
}
</script>

<style lang="scss">
hr {
  margin: 2em auto;
  background-color: #0089ff;
  height: 2px;
  width: 7em;
}
</style>
