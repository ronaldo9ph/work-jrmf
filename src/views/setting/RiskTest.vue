<template lang="html">
<div class="riskTest">
  <div class="box w">
    <p>你的投资理财偏好有个初步的了解，从而为你选择合适的投资理财产品以及组合方案。</p>
    <p>请你认真阅读下列12个问题，并选择合适的选项。我们承诺对你的个人资料保密。请确保你所提供的答案和资料是客观、真实、准确、完整、有效的！ 在基金购买过程中注意核对自己的风险承受能力和基金产品风险的匹配情况。</p>
  </div>
  <div class="padbox">
    <router-link :to="{ name: 'riskquestion'}" class="btn btn-block btn-red">开始测评</router-link>
  </div>
</div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.fullPath !== '/' && from.fullPath.indexOf('openaccountinfo') <= 0) {
        window.localStorage.setItem('backUrl', from.fullPath)
      }
      let backUrl = window.localStorage.getItem('backUrl')
      vm.$store.commit('backUrl', {backUrl: backUrl})
    })
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
