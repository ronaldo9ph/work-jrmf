// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './store'
import router from './router'
import http from './plugins/http'
import {ToastPlugin, LoadingPlugin, Countup} from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(Countup)
Vue.use(VueRouter)
Vue.config.productionTip = false
/* 保留两位小数 */
Vue.filter('discount', function (value) {
  return value.toFixed(2)
})
const FastClick = require('fastclick')
FastClick.attach(document.body)

const commit = store.commit
router.beforeEach((to, from, next) => {
  commit('updateLoadingStatus', {isLoading: true})
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    setTimeout(next, 100)
  }
})
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

Vue.use(http)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
