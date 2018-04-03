import http from '../../libs/http.js'

export default {
  install (Vue) {
    Vue.prototype.$http = http
    Vue.http = http
  },
  $http: http
}

export const $http = http
