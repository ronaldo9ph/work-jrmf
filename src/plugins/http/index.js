import http from '../libs/http'

export default {
  install (Vue) {
    Vue.prototype.$http = http
    Vue.http = http
  },
  $http: http
}

export const $http = http
