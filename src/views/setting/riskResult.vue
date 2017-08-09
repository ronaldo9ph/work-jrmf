<template lang="html">
<div class="RiskResult">
  <div class="padbox">
    <h3 class="t">您的投资类型为</h3>
    <p class="type text-center">“{{riskLevelDesc}}”</p>
    <p class="text-gray text-left text-normal">{{riskLevelInfo}}</p>
  </div>
  <div class="padbox">
    <router-link :to="{ name: 'fundindex'}" class="btn btn-block btn-red">完成</router-link>
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
  created: async function () {
    const res = await this.$http.get('api/v1/funds/risks')
    if (res.data.fstat) {
      this.riskLevelDesc = res.data.riskLevelDesc
      this.riskLevelInfo = res.data.riskLevelInfo
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
