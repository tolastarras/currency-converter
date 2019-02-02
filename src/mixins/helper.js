export default {
  created () {
    // console.log('mixin helper ...')
  },
  methods: {
    formatCountryName (value) {
      if (!value) return
      return value.replace(/(.*)\s\((.*)\)/, '$2 $1').replace(/(.*),(.*)/, '$2 $1')
    },
    isFromCurrency (target) {
      // find parent class of select option
      return target.closest('.form-row').classList.contains('from-currency-js')
    }
  }
}
