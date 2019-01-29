<template>
  <div class="dropdown">
    <button class="btn btn-select" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img :src="currencyType.flag"> {{ currencyType.name }} <span>{{ currencyType.code }} <i class="fa fa-caret-down"></i></span>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button @click="handleClick" class="dropdown-item" type="button" v-for="currency in currencies" :key="currency.code" :value="currency.code" :class="currency.code === currencyType.code ? 'selected' : ''">
        <img :src="flag(currency)">{{ currency.name }}<span>{{ currency.code }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    currencyType: Object
  },
  computed: mapState(['currencies']),
  methods: {
    handleClick ({ target }) {
      // method name based on drop box selected
      let method = (this.isFromCurrency(target) ? 'updateFromCurrencyByCode' : 'updateToCurrencyByCode')

      this.$store.dispatch(method, target.value)
    },
    isFromCurrency (target) {
      // find parent class of select option
      return target.closest('.form-row').classList.contains('from-currency-js')
    },
    flag (currency) {
      if (currency.code.toLowerCase() === 'eur') {
        return require('@/assets/flags/europe.svg')
      }
      return currency.countries[0].flag
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-family: monospace;
  font-size: 1.2em;
  font-weight: bold;
  float: right;
}

button {
  font-size: 1.1em;
  padding-left: .7em;
  background: #fff;

  > img {
    height: 20px;
    width: 30px;
    margin-top: -6px;
    margin-right: 10px;
  }

  span > i {
    vertical-align: bottom !important;
  }
}

.btn-select {
  border: 1px solid #ccc;
  text-align: left;
  padding-left: .7em;
  width: 100%;
}

.dropdown-menu {
  height: 30vh;
  width: 100%;
  overflow-y: scroll;

  > button:hover, .selected {
    background: #17a2b8;
    color: #fff;
  }
}
</style>
