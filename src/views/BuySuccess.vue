<template lang="html">
  <div class="redeemSuc">
    <p class="w"><i></i>订单提交成功</p>
    <div class="box">
      <div class="line"></div>
      <div class="it"><i><em></em></i>等待基金公司确认</div>
      <div class="it"><i></i><p>确认份额并开始计算收益</p></div>
      <div class="it mid"><i></i><p>收益可查询</p><p class="text-gray text-normal">通常2-3个工作日</p></div>
    </div>
    <div class="padbox">
      <router-link :to="{ name: 'order',params:{'id':123}}" class="btn btn-white btn-block">继续购买</router-link>
      <router-link :to="{ name: 'fundindex'}" class="btn btn-red btn-block">返回首页</router-link>
    </div>
    <div class="padbox text-gray text-normal">
      <p>交易日15:00前的交易申请，下一个工作日确认，15:00后的交易申请或非交易日的交易申请将视为是下一个交易日的申请，
        确认日期向后顺延一个工作日</p>
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
@import '../styles/style.less';
</style>
