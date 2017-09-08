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
    <h3 class="title"><span class="w">日盈利</span></h3>
    <ul :class="profitFundList.length>5?'item over':'item'" v-if="profitFundList.length!=0" id="mod-1">
      <li v-for="item in profitFundList">
        <router-link :to="{ name: 'fundassets', params: {'id':item.fundcode} }" class="clearfix">
          <span class="name pull-left">{{item.fundname}}</span>
          <span class="text-red pull-right">+{{item.yestDprofit}}元</span>
        </router-link>
      </li>
    </ul>
    <div class="text-center act" v-if="profitFundList.length>5">
      <a href="javascript:void(0)" class="down" @click="showFun(1,$event)">查看更多</a>
    </div>
    <p class="text-center text-gray padbox" v-if="profitFundList.length==0">暂无数据！</p>
  </div>
  <div class="box">
    <h3 class="title"><span class="w">日亏损</span></h3>
    <ul :class="lossFundList.length>5?'item over':'item'" v-if="lossFundList.length!=0" id="mod-2">
      <li v-for="item in lossFundList">
        <router-link :to="{ name: 'fundassets', params: {'id':item.fundcode} }" class="clearfix">
          <span class="name pull-left">{{item.fundname}}</span>
          <span class="text-green pull-right">{{item.yestDprofit}}元</span>
        </router-link>
      </li>
    </ul>
    <div class="text-center act" v-if="lossFundList.length>5">
      <a href="javascript:void(0)" class="down" @click="showFun(2,$event)">查看更多</a>
    </div>
    <p class="text-center text-gray padbox" v-if="lossFundList.length==0">暂无数据！</p>
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
    this.$vux.loading.show({
      text: '加载中...'
    })
    const res = await this.$http.get('api/v1/funds/holdings')
    if (res.data.fstat === 1) {
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
    this.$vux.loading.hide()
    if (res.data.fstat === 9) {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  },
  methods: {
    showFun: function (id, event) {
      if (event.currentTarget.innerText === '收起') {
        document.getElementById('mod-' + id).style.height = '200px'
        event.currentTarget.innerText = '查看更多'
        event.currentTarget.setAttribute('class', 'down')
      } else {
        document.getElementById('mod-' + id).style.height = 'auto'
        event.currentTarget.innerText = '收起'
        event.currentTarget.setAttribute('class', 'up')
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/index.less';
</style>
