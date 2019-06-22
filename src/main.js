import Vue from 'vue'
import App from './App'
import store from './store'
import axios from '@/lib/axios'

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$axios = axios
console.log(store)
// import collapseTransition from './lib/anition'
// Vue.component('collapseTransition',collapseTransition)
// console.log(collapseTransition)

App.mpType = 'app'

const app = new Vue({
		store,
  ...App,

})
app.$mount()
 