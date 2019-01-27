<template>
  <div class="container">
    <h2 class="mb-4">There are {{ currencyCountries.length }} Countries accepting the {{ toCurrency.name }}</h2>
    <ul class="list-inline text-left">
      <li class="list-inline-item col-md-6 col-xl-4" :key="country.name" v-for="country in currencyCountries">
        <img :src="country.flag"> <span>{{ country.name }}</span>
      </li>
    </ul>
  </div> 
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['toCurrency']),
    ...mapGetters(['currencyCountries'])
  }
}
</script>

<style lang="scss">
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
