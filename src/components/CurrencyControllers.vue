<template>
  <form class="mt-4">
    <!-- <div class="form-row">
      <div class="col">
        <input type="text" class="form-control" placeholder="Amount" v-model="fromCurrencyAmount">
      </div>
      <div class="col">
        <select class="from-currency-js form-control" @change="handleChange('fromCurrency', $event)">
          <option v-for="currency in sortedCurrencies" :key="currency.code" :selected="selectedOption(currency.code, 'fromCurrency')" :value="currency.code">{{ currency.name }}</option>
        </select>
      </div>
    </div> -->
    <div class="form-row mt-2">
      <div class="col">
        <input type="text" class="form-control" placeholder="Amount">
      </div>
      <div class="col">
        <select-box />
      </div>
    </div>
  </form>
</template>

<script>
import SelectBox from '@/components/SelectBox'

export default {
  components: {
    SelectBox
  }
}
</script>

<style>

</style>
