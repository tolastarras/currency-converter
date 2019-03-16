<template>
  <div class="main-container text-center">
    <div class="header pt-5">
      <h1 class="text-warning">Currency Converter</h1>
      <hr>
      <div class="pt-4">
        <message-header />
        <div class="container">
          <currency-selectors />
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
import CurrencySelectors from '@/components/CurrencySelectors'
import MessageHeader from '@/components/MessageHeader'
import CountryList from '@/components/CountryList'
import FooterView from '@/components/Footer'

export default {
  name: 'home',
  components: {
    CurrencySelectors,
    MessageHeader,
    CountryList,
    FooterView
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/views/home.scss';
</style>
