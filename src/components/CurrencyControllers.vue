<template>
  <form class="mt-4">
    <div class="form-row mb-2" :key="controller.class" v-for="controller in controllers">
      <div class="col">
        <input @change="handleInputChange" type="text" class="form-control" placeholder="Amount" v-model="controller.input">
      </div>
      <div class="col">
        <select class="form-control" :class="controller.class" @change="handleSelectChange(controller.class, $event)">
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code" :selected="selectedOption(controller.class, currency.code)">
            {{ currency.name }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      controllers: [
        { class: 'from-currency', input: 1 },
        { class: 'to-currency', input: 0.86 }
      ]
    }
  },
  methods: {
    selectedOption (type, code) {
      // return code === (type === 'fromCurrency' ? this.fromCurrency : this.toCurrency)
      if (type === 'from-currency') {
        return code === this.fromCurrency
      }

      return code === this.toCurrency
    },
    handleInputChange () {
      console.log('input change ...')
    },
    handleSelectChange (type, event) {
      console.log('TYPE:', type)
      let method = (type ==='from-currency' ? 'setFromCurrency' : 'setToCurrency')
      this.$store.commit(method, event.target.value)
    }    
  },
  computed: {
    ...mapState(['fromCurrency', 'toCurrency', 'currencies'])
  }  
}
</script>
