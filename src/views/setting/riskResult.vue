<template lang="html">
<div class="RiskResult">
  <div class="padbox">
    <h3 class="t">您的投资类型为</h3>
    <p class="type text-center">“{{riskLevelDesc}}”</p>
    <p class="text-gray text-left text-normal">{{riskLevelInfo}}</p>
  </div>
  <div class="padbox">
    <a class="btn btn-block btn-red" href="javascript:void(0)" @click="loadHref()">完成</a>
    <router-link :to="{ name: 'risktest'}" class="btn btn-block btn-white">重测</router-link>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      riskLevelDesc: '', // 类型
      riskLevelInfo: '' // 描述
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.fullPath === '/setting') {
        window.localStorage.setItem('backUrl', from.fullPath)
        let backUrl = window.localStorage.getItem('backUrl')
        vm.$store.commit('backUrl', {backUrl: backUrl})
      }
    })
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/risks')
    if (res.data.fstat === 1) {
      this.riskLevelDesc = res.data.riskLevelDesc
      this.riskLevelInfo = res.data.riskLevelInfo
    }
    if (res.data.fstat === 9) {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  },
  methods: {
    loadHref: function () {
      console.log(this.$store.state.backUrl)
      if (this.$store.state.backUrl === '/bank' || this.$store.state.backUrl === '/setting' || this.$store.state.backUrl === '/riskresult') {
        this.$router.push({path: 'myhold'})
      } else {
        this.$router.push({path: this.$store.state.backUrl})
        window.localStorage.setItem('backUrl', '')
        let backUrl = window.localStorage.getItem('backUrl')
        this.$store.commit('backUrl', {backUrl: backUrl})
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
