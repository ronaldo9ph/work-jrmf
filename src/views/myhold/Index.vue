<template lang="html">
<div class="myhold" v-if="isShow">
  <div class="top">
    <router-link :to="{ name: 'setting'}" class="set">设置</router-link>
    <p class="t">总金额(元)<em :class="[isHide?'icon':'icon dis']" @click="totalShow"></em></p>
    <p class="num total" v-if="isHide">{{fundmarketvalue}}</p>
    <p class="num total" v-else>****</p>
    <div class="con clearfix">
      <div class="item">
        <p>昨日收益(元)</p>
        <p class="num"><span v-if="fundYesDprofit>0">+</span>{{fundYesDprofit}}</p>
      </div>
      <div class="item">
        <p>持有收益(元)</p>
        <p class="num"><span v-if="fundTotalprofit>0">+</span>{{fundTotalprofit}}</p>
      </div>
    </div>
  </div>
  <div v-if="openAccountStatus!=0">
    <div class="act box clearfix">
      <router-link :to="{ name: 'detailprofit'}"><i class="sy"></i>收益明细</router-link>
      <router-link :to="{ name: 'chargelist/history'}"><i class="jy"></i>交易纪录</router-link>
    </div>
    <router-link :to="{ name: 'chargelist/ing'}" class="link box" v-if="count">有<span class="text-red">{{count}}</span>笔交易正在确认中</router-link>
    <ul class="list">
      <li v-for="item in fundList" @click="locHref(item.fundcode)">
        <div class="tp clearfix">
          <h3 class="t pull-left">{{item.fundname}}（{{item.fundcode}}）</h3>
          <span class="tag pull-right">{{item.fundtype}}</span>
        </div>
        <div class="bt clearfix">
          <div class="item pull-left">
            <p class="text-gray t">金额(元)</p>
            <p class="num text-red">{{item.minredemptionvol}}</p>
          </div>
          <div class="item pull-left">
            <p class="text-gray t">昨日收益(元)</p>
            <p :class="[item.yestDprofit>=0?'num text-red':'num text-green']"><span v-if="item.yestDprofit>0">+</span>{{item.yestDprofit}}</p>
          </div>
          <div class="item pull-left">
            <p class="text-gray t">持有收益(元)</p>
            <p :class="[item.holdProfit>=0?'num text-red':'num text-green']"><span v-if="item.holdProfit>0">+</span>{{item.holdProfit}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div v-if="openAccountStatus==0" class="text-gray text-center pad">
    想赚钱？快来买<router-link :to="{ name: 'fundindex'}" class="text-blue">基金</router-link>吧
  </div>
  <div class="fixed-bottom">
    <router-link :to="{ name: 'fundindex'}"><i class="hot"></i>热门</router-link>
    <router-link :to="{ name: 'myhold'}" class="current"><i class="hold"></i>持有</router-link>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      fundTotalprofit: '', // 持有收益
      fundYesDprofit: '', // 昨日收益
      fundmarketvalue: '', // 总金额
      fundList: [], // 持有基金列表
      count: '', // 确认中个数
      openAccountStatus: 0,
      isShow: false,
      isHide: true
    }
  },
  created: async function () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    const res = await this.$http.get('api/v1/funds/holdings')
    if (res.data.fstat === 1) {
      this.fundTotalprofit = res.data.fundTotalprofit
      this.fundYesDprofit = res.data.fundYesDprofit
      this.fundmarketvalue = res.data.fundmarketvalue
      this.count = res.data.count
      this.fundList = []
      for (let i = 0; i < res.data.fundList.length; i++) {
        this.fundList[i] = res.data.fundList[i]
      }
    }
    if (res.data.fstat === 9) {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
    const result = await this.$http.get('api/v1/funds/accounts')
    if (result.data.fstat) {
      this.openAccountStatus = result.data.openAccountStatus
    }
    this.isShow = true
    this.$vux.loading.hide()
    if (result.data.fstat === 9) {
      this.$vux.toast.text(result.data.respmsg, 'middle')
      return false
    }
  },
  methods: {
    locHref: function (id) {
      this.$router.push({path: '/fundassets/' + id})
    },
    totalShow: function () {
      this.isHide = !this.isHide
    }
  }
}

</script>

<style lang="less">
@import '../../styles/index.less';
</style>
