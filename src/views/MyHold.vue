<template lang="html">
<div class="myhold">
  <div class="top">
    <router-link :to="{ name: 'setting'}" class="set">设置</router-link>
    <p class="t">总金额(元)</p>
    <p class="num total">{{fundmarketvalue}}</p>
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
  <div class="act box clearfix">
    <router-link :to="{ name: 'detailprofit'}"><i class="sy"></i>收益明细</router-link>
    <router-link :to="{ name: 'chargelist/all'}"><i class="jy"></i>交易纪录</router-link>
  </div>
  <router-link :to="{ name: 'chargelist/wait'}" class="link box" v-if="count">有<span class="text-red">{{count}}</span>笔交易正在确认中</router-link>
  <ul class="list">
    <li v-for="item in fundList" @click="locHref(item.fundcode)">
      <div class="tp clearfix">
        <h3 class="t pull-left">{{item.fundname}}（{{item.fundcode}}）</h3>
        <span class="tag pull-right">{{item.fundtype}}</span>
      </div>
      <div class="bt clearfix">
        <div class="item pull-left">
          <p class="text-gray t">金额(元)</p>
          <p class="num text-red"><span v-if="item.minredemptionvol>0">+</span>{{item.minredemptionvol}}</p>
        </div>
        <div class="item pull-left">
          <p class="text-gray t">昨日收益(元)</p>
          <p class="num text-red"><span v-if="item.yestDprofit>0">+</span>{{item.yestDprofit}}</p>
        </div>
        <div class="item pull-left">
          <p class="text-gray t">持有收益(元)</p>
          <p :class="[item.holdProfit>=0?'num text-red':'num text-green']"><span v-if="item.holdProfit>0">+</span>{{item.holdProfit}}</p>
        </div>
      </div>
    </li>
  </ul>
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
      count: '' // 确认中个数
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/holdings')
    if (res.data.fstat) {
      this.fundTotalprofit = res.data.fundTotalprofit
      this.fundYesDprofit = res.data.fundYesDprofit
      this.fundmarketvalue = res.data.fundmarketvalue
      this.count = res.data.count
      this.fundList = []
      for (let i = 0; i < res.data.fundList.length; i++) {
        this.fundList[i] = res.data.fundList[i]
      }
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
    }
  },
  methods: {
    locHref: function (id) {
      this.$router.push({path: '/fundassets/' + id})
    }
  }
}

</script>

<style lang="less">
@import '../styles/index.less';
</style>
