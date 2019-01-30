<template>
  <div class="main-container text-center">
    <div class="header pt-5">
      <div class="divider" :style="{ backgroundImage: 'url(' + require('@/assets/divider.svg') + ')' }"></div>
      <h1 class="text-warning">Currency Converter</h1>
      <div class="pt-4">
        <message-header />
        <div class="container">
          <currency-controllers />
        </div>
      </div>
    </div>
    <div class="pt-5">
      <country-list />
    </div>
  </div>
</template>

<script>
import CurrencyControllers from '@/components/CurrencyControllers'
import MessageHeader from '@/components/MessageHeader'
import CountryList from '@/components/CountryList'

export default {
  name: 'home',
  components: {
    CurrencyControllers,
    MessageHeader,
    CountryList
  }
}
</script>

<style lang="scss" scoped>
// <polygon class="svg--sm" fill="#ddd" points="0,0 30,100 65,21 90,100 100,75 100,100 0,100"/>
.header {
  background: linear-gradient(#ff6126, #ff922f);
  padding-bottom: 8em;
  position: relative;
}

hr {
  margin: 2em auto;
  background: #0089ff;
  height: 2px !important;
  width: 7em;
}

.divider {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  width: 100.06%;
  /* drop the height to have a constant angle for all screen widths */
  height: 100px;
}
</style>
