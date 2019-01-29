<template>
  <div class="container">
    <div v-if="currencyCountries.length > 1">
      <h3 class="mb-4">
        There are {{ currencyCountries.length }} Countries accepting the {{ toCurrency.name }}
      </h3>
      <ul class="list-inline text-left">
        <li class="list-inline-item col-md-6 col-xl-4" :key="country.name" v-for="country in currencyCountries">
          <img :src="country.flag"> <span>{{ country.name }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <h3 class="mb-5">
        {{ currencyCountries[0].name }} is the only country accepting the {{ toCurrency.name }}
      </h3>
      <div class="one-country">
        <img :src="currencyCountries[0].flag">
      </div>
    </div>
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
  display: flex;
  flex-wrap: wrap;

  > li {
    list-style: none;
    font-size: 1.3em;
    margin-right: 0 !important;
    margin-top: 0.8em;
    padding-left: 0;
    // height: 3em;
    vertical-align: middle;
    background-color: #ddd;
    border-bottom: 1px dotted #bbb;
    padding-bottom: 0.4em;

    > img {
      width: 36px;
      height: 26px;
      margin-right: 10px;
      margin-top: -5px;
    }
  }
}
.one-country > img {
  width: 300px;
}
</style>
