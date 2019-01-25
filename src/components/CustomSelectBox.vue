<template>
  <div class="dropdown">
    <button class="btn btn-select" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img src="https://restcountries.eu/data/esp.svg">{{ currencyName(fromCurrency) }} <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button @click="handleClick" class="dropdown-item" type="button" v-for="currency in currencies" :key="currency.code" :value="currency.code" :class="currency.code === fromCurrency ? 'selected' : ''"><img src="https://restcountries.eu/data/esp.svg">{{ currency.name }}</button>
    </div>
  </div>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['currencies', 'fromCurrency', 'toCurrency']),
    ...mapGetters(['currencyName'])
  },
  methods: {
    ...mapActions(['updateFromCurrency']),
    handleClick ({ target }) {
      this.updateFromCurrency(target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  font-size: 1.1em;
  padding-left: .7em;
  color: #666;

  > img {
    height: 20px;
    margin-top: -6px;
    margin-right: 10px;
  }

  i {
    float: right;
    margin-top: .4em;
  }
}

.btn-select {
  border: 1px solid #ccc;
  text-align: left;
  padding-left: .7em;
  width: 100%;
}

.dropdown-menu {
  height: 20vh;
  overflow-y: scroll;

  > button:hover, .selected {
    background: #17a2b8;
    color: #fff;
  }
}
</style>
