import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    isLoading: false,
    backUrl: '',
    token: 'aaa'
  },
  mutations: {
    // example
    increment (state) {
      state.count++
    },
    // Loading
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    // backUrl
    backUrl (state, back) {
      state.backUrl = back.backUrl
    }
  }
})
