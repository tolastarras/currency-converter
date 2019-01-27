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
    <div class="pt-5">
      <h2 class="mb-4">Countries accepting the {{ toCurrency.name }}</h2>
      <ul class="list-inline text-left">
        <li class="list-inline-item col-md-6 col-xl-4" :key="country.name" v-for="country in currencyCountries">
          <img :src="country.flag"> <span>{{ country.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import stringSimilarity from 'string-similarity'
import { mapState, mapGetters } from 'vuex'

import CurrencyControllers from '@/components/CurrencyControllers'
import MessageHeader from '@/components/MessageHeader'
import json from '@/test.json'

export default {
  name: 'home',
  data () {
    return {
      elements: []
    }
  },
  components: {
    CurrencyControllers,
    MessageHeader
  },
  methods: {
    indexOfCurrency (code) {
      return this.elements.findIndex(element => element.code === code)
    },
    isValidCurrency (code) {
      return code && code !== '(none)'
    },
    /**
     * Add currency to currencies array or countries to currency countries array if currency already in array.
     */
    addElementsToArray (country, currency) {
      // discard duplicate currencies
      let index = this.indexOfCurrency(currency.code)

      // currency found at position index
      if (index > 0) {
        // add country to currency countries array
        this.elements[index].countries.push({ name: country.name, flag: country.flag })
      } else {
        // currency not in the array yet
        this.elements.push(currency)
      }

      this.rearrangeArray()
    },
    /**
     * Move main flag in front of array for easier handling.
     * for example: United States flag for USD currencies
     */
    rearrangeArray () {
      this.elements.forEach(item => {
        if (item.countries.length > 1) {
          console.log('******************')
          // console.log('currency:', item.name + ', code: ' + item.code)
          let index = this.bestMatchIndex(item)

          // move country to the front of the array
          if (index > 0) {
            console.log('INDEX', index)
            // console.log(item.countries)
            // console.log(item.countries[index])
            let country = item.countries[index]
            console.log('country @ index ' + index, country)
            item.countries[index] = item.countries[0]
            item.countries[0] = country
            // console.log('COUNTRY', country)
            // item.countries.unshift(country[0])
            console.log(item.countries)
          }
        }
      })

      this.elements.map(country => country.code === 'USD')
    },
    bestMatchIndex (item) {
      // array of countries that share the same currency
      let countries = item.countries.map(country => country.name)
      let matches = stringSimilarity.findBestMatch(item.name, countries)
      // guessed flag country
      let possibleCountry = matches.bestMatch.target

      // find country in array of countries
      return countries.findIndex(country => country === possibleCountry)
    }
  },
  created () {
    // load data from API
    // json.map(country => {
    //   country.currencies.map(currency => {
    //     // initialize additional fields
    //     currency = { ...currency, 'countries': [{ name: country.name, flag: country.flag }] }
    //     // discard currencies with empty or invalid codes
    //     if (this.isValidCurrency(currency.code)) {
    //       this.addElementsToArray(country, currency)
    //     }
    //   })
    // })
  },
  computed: {
    ...mapGetters(['currencyCountries']),
    ...mapState(['toCurrency'])
  }
}
</script>

<style lang="scss" scoped>
body {
  background: #ccf;
}
hr {
  margin: 2em auto;
  background-color: #0089ff;
  height: 2px;
  width: 7em;
}
ul {
  display: inline;

  > li {
    list-style: none;
    font-size: 1.3em;
    margin-right: 0 !important;
    margin-top: 0.8em;
    padding-left: 0;
    // height: 3em;
    vertical-align: middle;
    background-color: #eee;

    > img {
      width: 36px;
      height: 26px;
      margin-right: 10px;
      margin-top: -5px;
    }
  }
}
</style>
