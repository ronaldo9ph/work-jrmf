<template lang="html">
<div class="fund-assets">
  <div class="top">
    <table class="tb">
      <tr>
        <td colspan="3" class="text-x-large name">基金名称（123456）</td>
      </tr>
      <tr>
        <td>
          <p>市值（元）</p>
          <p class="num">1234.00</p>
        </td>
        <td>
          <p>最新净值（07-17）</p>
          <p class="num">1.00</p>
        </td>
        <td>
          <p>持有份额（份）</p>
          <p class="num">1325</p>
        </td>
      </tr>
    </table>
  </div>
  <div class="box clearfix item text-center">
    <div class="it pull-left">
      <p class="text-gray t">日收益率</p>
      <p class="text-red">-12.00(-0.3%)</p>
    </div>
    <div class="it pull-left">
      <p class="text-gray t">日收益率</p>
      <p class="text-red">-12.00(-0.3%)</p>
    </div>
  </div>
  <div class="box chtBox">
    <div class="tab">
      <router-link :to="{ name: '', params: {} }">单位净值</router-link>
      <router-link :to="{ name: '', params: {} }">累积盈亏</router-link>
    </div>
    <div class="chtCon">
      折线图
    </div>
  </div>
  <div class="box chtBox">
    <div class="tab">
      <router-link :to="{ name: 'fundassets/sydetail', params: {'id':123} }">收益明细</router-link>
      <router-link :to="{ name: 'fundassets/jyrecord', params: {'id':123} }">交易记录</router-link>
    </div>
    <router-view></router-view>
  </div>
  <div class="fixedbar clearfix">
    <router-link :to="{ name: 'order', params: {'id':123} }">投</router-link>
    <router-link :to="{ name: 'redeem', params: {'id':123} }">赎回</router-link>
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
@import '../../styles/style.less';
</style>
