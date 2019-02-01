<template>
  <div class="container">
    <div v-if="currencyCountries.length === 1">
      <h3 class="mb-5">
        {{ format(currencyCountries[0].name) }} is the only country accepting the {{ toCurrency.name }}
      </h3>
      <div class="one-country">
        <a :href="wikipediaLink(currencyCountries[0].name)" target="__blank">
          <img :src="currencyCountries[0].flag">
        </a>
      </div>
    </div>
    <!-- v-else generates an error because it triggers prior to currencyCountries being loaded (when its length is zero). -->
    <div v-else-if="currencyCountries.length > 1">
      <h3 class="mb-4">
        There are {{ currencyCountries.length }} Countries accepting the {{ toCurrency.name }}
      </h3>
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

<style lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;

  > li {
    list-style: none;
    font-size: 1.2em;
    margin-right: 0 !important;
    margin-top: 0.8em;
    padding-left: 0;
    // height: 3em;
    vertical-align: middle;
    background-color: #ddd;
    border-bottom: 1px dotted #bbb;
    padding-bottom: 0.4em;

    > a {
      color: #666;
      display: flex;
      align-items: center;

      &:hover {
        color: #222;
        text-decoration: none;
      }

      span {
        line-height: 1em;
      }

      > img {
        width: 36px;
        height: 26px;
        margin-right: 10px;
        margin-top: -5px;
      }
    }
  }
}
.one-country img {
  width: 300px;
}
</style>
