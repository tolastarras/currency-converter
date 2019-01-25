<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
      <button class="dropdown-item" type="button" v-for="currency in currencies" :key="currency.code" :value="currency.code" :selected="currency.code === toCurrency"><img style="height:20px;margin-right:10px;" src="https://restcountries.eu/data/esp.svg">{{ currency.name }}</button>
    </div>
  </div>  
</template>

<script>
export default {

}
</script>

<style>

</style>
