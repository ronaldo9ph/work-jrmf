<template lang="html">
<div class="RiskResult">
  <div class="padbox">
    <h3 class="t">您的投资类型为</h3>
    <p class="type text-center">“稳健型”</p>
    <p class="text-gray text-left text-normal">您对风险损失较为谨慎，投资时您注重资金的安全性，追求稳健的收益回报。</p>
  </div>
  <div class="padbox">
    <router-link :to="{ name: ''}" class="btn btn-block btn-red">完成</router-link>
    <router-link :to="{ name: ''}" class="btn btn-block btn-white">重测</router-link>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      bank:''
    }
  },
  created: async function () {
    const res = await this.$http.post('')
    if (res) {

    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
