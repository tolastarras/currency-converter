<template>
  <div class="main-container text-center">
    <div class="header pt-5">
      <h1 class="text-warning">Currency Converter</h1>
      <hr>
      <div class="pt-4">
        <message-header />
        <div class="container">
          <currency-controllers />
        </div>
      </div>
      <!-- <img :style="{ backgroundImage: 'url(' + require('@/assets/curve.svg') + ')' }"> -->
      <!-- <img :src="require('@/assets/curve.svg')" /> -->
    </div>
    <div class="country-list">
      <country-list />
    </div>
    <footer-view />
  </div>
</template>

<script>
import CurrencyControllers from '@/components/CurrencyControllers'
import MessageHeader from '@/components/MessageHeader'
import CountryList from '@/components/CountryList'
import FooterView from './Footer'

export default {
  name: 'home',
  components: {
    CurrencyControllers,
    MessageHeader,
    CountryList,
    FooterView
  }
}
</script>

<style lang="scss" scoped>
// <polygon class="svg--sm" fill="#ddd" points="0,0 30,100 65,21 90,100 100,75 100,100 0,100"/>
.header {
  background: linear-gradient(#ff6126, #ff922f);
  padding-bottom: 5em;
  position: relative;
}

hr {
  margin: 2em auto;
  background: #ff922f;
  height: 2px !important;
  width: 5em;
}

.country-list {
  margin: 4em 0 6em 0;
}
</style>
