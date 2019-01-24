<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Home from './views/Home'

export default {
  name: 'app',
  components: {
    Home
  },
  created () {
    if (this.currencies.length === 0) {
      this.$store.dispatch('loadCurrencies')
    }
  },
  computed: mapState(['currencies'])
}
</script>
