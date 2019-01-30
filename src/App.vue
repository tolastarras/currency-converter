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
      this.$store.dispatch('init')
    }
  },
  computed: mapState(['currencies'])
}
</script>

<style lang="scss">
body {
  background: #ddd !important;
  font-family: arial !important;
}
svg {
  display: none;
}
@media (max-width: 700px) {
  .svg--sm {
    display: none;
  }
}
</style>
