import Vue from 'vue'

import App from './App.vue'
import store from './store/'
import helper from './mixins/helper'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

new Vue({
  store,
  mixins: [helper],
  render: h => h(App)
}).$mount('#app')
