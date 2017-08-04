<template lang="html">
<div class="detailprofit" v-if="isShow">
  <div class="top clearfix">
    <div class="item">
      <p class="text-small">日收益(元)</p>
      <p class="num"><span v-if="fundYesDprofit>0">+</span>{{fundYesDprofit}}</p>
    </div>
    <div class="item">
      <p class="text-small">日收益率({{lastDate}})</p>
      <p class="num">{{fundYesDPec}}%</p>
    </div>
  </div>
  <div class="box">
    <h3 class="title"><span class="w">盈利</span></h3>
    <ul class="item" v-if="profitFundList.length!=0">
      <li v-for="item in profitFundList">
        <router-link :to="{ name: 'fundassets', params: {'id':item.fundcode} }" class="clearfix">
          <span class="name pull-left">{{item.fundname}}</span>
          <span class="text-red pull-right">+{{item.yestDprofit}}元</span>
        </router-link>
      </li>
    </ul>
    <p class="text-center text-gray padbox" v-else>暂无数据！</p>
  </div>
  <div class="box">
    <h3 class="title"><span class="w">亏损</span></h3>
    <ul class="item" v-if="lossFundList.length!=0">
      <li v-for="item in lossFundList">
        <router-link :to="{ name: 'fundassets', params: {'id':item.fundcode} }" class="clearfix">
          <span class="name pull-left">{{item.fundname}}</span>
          <span class="text-green pull-right">-{{item.yestDprofit}}元</span>
        </router-link>
      </li>
    </ul>
    <p class="text-center text-gray padbox" v-else>暂无数据！</p>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      lossFundList: [], // 亏损基金列表
      profitFundList: [], // 盈利基金列表
      fundYesDprofit: '', // 昨日收益
      lastDate: '', // 日期
      fundYesDPec: '', // 昨日收益率
      isShow: false
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/holdings')
    if (res.data.fstat) {
      this.isShow = true
      if (res.data.lossFundList.length > 0) {
        let arr1 = this.lossFundList.concat(res.data.lossFundList)
        this.lossFundList = arr1
      }
      if (res.data.profitFundList.length > 0) {
        let arr2 = this.profitFundList.concat(res.data.profitFundList)
        this.profitFundList = arr2
      }
      this.fundYesDprofit = res.data.fundYesDprofit
      this.lastDate = res.data.lastDate
      this.fundYesDPec = res.data.fundYesDPec
    }
  }
}

</script>

<style lang="less">
@import '../styles/index.less';
</style>
