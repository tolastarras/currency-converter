<template>
  <div class="container">
    <div v-if="currencyCountries.length === 1">
      <h2 class="mb-5">
        {{ format(currencyCountries[0].name) }} is the only country accepting the {{ toCurrency.name }}
      </h2>
      <div class="one-country">
        <a :href="wikipediaLink(currencyCountries[0].name)" target="__blank">
          <img :src="currencyCountries[0].flag">
        </a>
      </div>
    </div>
    <!-- v-else generates an error because it triggers prior to currencyCountries being loaded (when its length is zero). -->
    <div v-else-if="currencyCountries.length > 1">
      <h2 class="mb-5">
        There are {{ currencyCountries.length }} Countries accepting the {{ toCurrency.name }}
      </h2>
      <ul class="list-inline text-left">
        <li class="list-inline-item col-md-6 col-xl-4" :key="country.name" v-for="country in currencyCountries">
          <a :href="wikipediaLink(country.name)" target="__blank">
            <img :src="country.flag"> <span>{{ format(country.name) }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['toCurrency']),
    ...mapGetters(['currencyCountries'])
  },
  methods: {
    wikipediaLink (countryName) {
      return `https://en.wikipedia.org/wiki/${countryName.replace(/\s/g, '_')}`
    },
    format (name) {
      return this.$root.formatCountryName(name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/country-list.scss';
</style>
