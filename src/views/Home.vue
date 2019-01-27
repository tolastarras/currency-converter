<template>
  <div class="container text-center">
    <h1>Currency Converter</h1>
    <hr>
    <div class="content row">
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
      {{ 'message' }}
    </div>
  </div>
</template>

<script>
import stringSimilarity from 'string-similarity'
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
    moveMainCountryToFront () {

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
    json.map(country => {
      country.currencies.map(currency => {
        // initialize additional fields
        currency = { ...currency, 'countries': [{ name: country.name, flag: country.flag }] }
        // discard currencies with empty or invalid codes
        if (this.isValidCurrency(currency.code)) {
          this.addElementsToArray(country, currency)
        }
      })
    })

    // console.log(this.elements)
    // this.elements.forEach(element => {
    //   let countries = element.countries
    //   countries.find(element => element.code === '')
    // })
    // console.log(this.elements.find(element => element.code === 'USD'))

    // let items = JSON.parse(localStorage.getItem('currencies'))
  }
}
</script>
