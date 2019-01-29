<template>
  <div class="container text-center my-5">
    <h1>Currency Converter</h1>
    <hr>
    <div class="row pt-4">
      <div class="col">
        <message-header />
        <div class="row">
          <div class="col">
            <currency-controllers />
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-5">
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

<style lang="scss">
hr {
  margin: 2em auto;
  background: #0089ff;
  height: 2px !important;
  width: 7em;
}
</style>
