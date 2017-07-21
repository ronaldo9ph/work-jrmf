// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import http from './plugins/http'

Vue.config.productionTip = false
/* 保留两位小数 */
Vue.filter('discount', function (value) {
  return value.toFixed(2)
})

axios.defaults.baseURL = 'http://rap.mofang.com/mockjsdata/2'

Vue.use(http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
