<template>
  <div class="dropdown">
    <button class="btn btn-select" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" :disabled="isDisabled">
      <img :src="currencyFlag(currencyType)"> {{ currencyType.name }} <span>{{ currencyType.code }} <i class="fa fa-caret-down"></i></span>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu">
      <button @click="handleClick" class="dropdown-item" type="button" v-for="currency in currencies" :key="currency.code" :value="currency.code" :class="currency.code === currencyType.code ? 'selected' : ''">
        <img :src="currencyFlag(currency)">{{ currency.name }}<span>{{ currency.code }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    currencyType: Object,
    isDisabled: Boolean
  },
  mounted () {
    console.log('xxx', this.readOnly)
  },
  computed: {
    ...mapState(['currencies']),
    ...mapState('conversions', ['count', 'limit'])
  },
  methods: {
    handleClick ({ target }) {
      // method name based on drop box selected
      let method = (this.$root.isFromCurrency(target) ? 'updateFromCurrencyByCode' : 'updateToCurrencyByCode')
      this.$store.dispatch(method, target.value)

      if (this.count < this.limit) {
        this.$store.dispatch('conversions/incrementCount')
      }
    },
    currencyFlag (currency) {
      // wait for data to load
      if (!currency.countries) return false

      if (currency.code.toLowerCase() === 'eur') {
        return require('@/assets/flags/europe.svg')
      }

      return currency.countries[0].flag
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/components/custom-select-box.scss';
</style>
