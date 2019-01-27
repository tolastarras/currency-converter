<template>
  <div class="dropdown">
    <button class="btn btn-select" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img :src="fromCurrency.flag">{{ fromCurrency.name }} <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button @click="handleClick" class="dropdown-item" type="button" v-for="currency in currencies" :key="currency.code" :value="currency.code" :class="currency.code === fromCurrency.code ? 'selected' : ''"><img :src="currency.countries[0].flag">{{ currency.name }}</button>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState(['currencies', 'fromCurrency', 'toCurrency']),
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
    width: 30px;
    margin-top: -6px;
    margin-right: 10px;
  }

  i {
    float: right;
    margin-top: .4em;
  }
}

.btn-select {
  border: 1px solid #bbb;
  text-align: left;
  padding-left: .7em;
  width: 100%;
  background: #fff;
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
