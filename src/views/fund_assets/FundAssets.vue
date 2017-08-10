<template lang="html">
<div class="fund-assets">
  <div class="top">
    <table class="tb">
      <tr>
        <td colspan="3" class="text-x-large name">{{fundname}}（{{fundcode}}）</td>
      </tr>
      <tr>
        <td>
          <p>市值（元）</p>
          <p class="num">{{minredemptionvol}}</p>
        </td>
        <td>
          <p>最新净值（{{lastDate}}）</p>
          <p class="num">{{nav}}</p>
        </td>
        <td>
          <p>持有份额（份）</p>
          <p class="num">{{currentshare}}</p>
        </td>
      </tr>
    </table>
  </div>
  <div class="box clearfix item text-center">
    <div class="it pull-left">
      <p class="text-gray t">日收益率</p>
      <p class="text-red">{{yestDprofit}}元({{yestdPct}}%)</p>
    </div>
    <div class="it pull-left">
      <p class="text-gray t">持仓收益率</p>
      <p class="text-red">{{holdProfit}}元({{holdPec}}%)</p>
    </div>
  </div>
  <div class="box chtBox">
    <tab :line-width="2" custom-bar-width="60px" active-color='#ef5643'>
      <tab-item selected   @on-item-click="showTab('c')">单位净值</tab-item>
      <tab-item  @on-item-click="showTab('d')">累积盈亏</tab-item>
    </tab>
    <div class="chtCon">
      <div v-show="c">
        单位净值
      </div>
      <div v-show="d">
        累积盈亏
      </div>
    </div>
  </div>
  <div class="box chtBox">
    <tab :line-width="2" custom-bar-width="60px" active-color='#ef5643'>
      <tab-item selected   @on-item-click="showTab('a')">收益明细</tab-item>
      <tab-item  @on-item-click="showTab('b')">交易记录</tab-item>
    </tab>
    <div class="syDetail" v-show="a">
      <ul class="list" v-if="profitList">
        <li class="clearfix" v-for="item in profitList">
          <span class="time pull-left">{{item.createtime}}</span>
          <span class="text-red pull-right"v-if="item.newprofit>0">+{{item.newprofit}}</span>
          <span class="text-red pull-right"v-else-if="item.newprofit=0">{{item.newprofit}}</span>
          <span :class="item.newprofit>=0?'text-red pull-right':'text-green pull-right' " v-else>-{{item.newprofit}}</span>
        </li>
      </ul>
      <p class="text-gray text-center pad" style="margin-top:90px;" v-else>暂无数据！</p>
      <div class="pad text-center" v-if="hasNext1">
        <a href="javascript:void(0)" class="text-gray" @click="loadData1()">点击加载更多</a>
      </div>
    </div>
    <div class="syDetail" v-show="b">
      <ul class="list" v-if="fundHistoryList">
        <li class="clearfix" v-for="item in fundHistoryList">
          <div class="pull-left">
            <p>申购确认</p>
            <p class="text-gray">{{item.createtime}}</p>
          </div>
          <div class="text-right pull-right">
            <p>1000</p>
            <p>确认成功</p>
          </div>
        </li>
      </ul>
      <p class="text-gray text-center pad" style="margin-top:80px;" v-else>暂无数据！</p>
      <div class="pad text-center" v-if="hasNext2">
        <a href="javascript:void(0)" class="text-gray" @click="loadData2()">点击加载更多</a>
      </div>
    </div>
  </div>
  <div class="fixedbar clearfix">
    <router-link :to="{ name: 'order', params: {'id':fundcode} }" v-if="fundstatus=='可申购赎回'">投</router-link>
    <a href="javascript:void(0)" class="disabled" v-else>投</a>
    <router-link :to="{ name: 'redeem', params: {'id':fundcode} }" v-if="canRedeem">赎回</router-link>
    <a href="javascript:void(0)" class="disabled" v-else>赎回</a>
  </div>
</div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      fundname: '', // 基金名称
      fundcode: '', // 基金代码
      minredemptionvol: '', // 市值
      nav: '',  // 最新净值
      lastDate: '', //  日期
      currentshare: '', // 持有份额
      holdPec: '', // 持仓收益率
      holdProfit: '', // 持仓收益
      yestdPct: '', // 日收益率
      yestDprofit: '', // 日收益
      canRedeem: '', // 是否可赎回
      fundstatus: '', // 是否可投
      a: true, // 显示收益明细
      b: false, // 显示交易记录
      c: true, // 显示单位净值
      d: false, // 显示累计盈亏
      index: 0,
      pageIndex1: 1, // 下一页页码
      pageIndex2: 1, // 下一页页码
      pageSize1: 10, // 每页显示个数
      pageSize2: 5, // 每页显示个数
      hasNext1: false, // 是否有下一页
      profitList: [], // 收益明细列表
      hasNext2: false, // 是否有下一页
      fundHistoryList: [] // 收益明细列表
    }
  },
  created: async function () {
    this.loadData1()
    this.loadData2()
    const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id)
    if (res.data.fstat) {
      this.fundname = res.data.fund.fundname
      this.fundcode = res.data.fund.fundcode
      this.minredemptionvol = res.data.fund.minredemptionvol
      this.lastDate = res.data.fund.lastDate
      this.currentshare = res.data.fund.currentshare
      this.holdPec = res.data.fund.holdPec
      this.holdProfit = res.data.fund.holdProfit
      this.yestDprofit = res.data.fund.yestDprofit
      this.yestdPct = res.data.fund.yestdPct
      this.nav = res.data.fund.nav
      this.canRedeem = res.data.fund.canRedeem
      this.fundstatus = res.data.fund.fundstatus
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
    }
  },
  methods: {
    loadData1: async function () {
      const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/incomes', {'page_no': this.pageIndex1, 'page_size': this.pageSize1})
      if (res.data.fstat) {
        if (this.pageIndex1 === 1) {
          this.profitList = []
        }
        for (let i = 0; i < res.data.profitList.length; i++) {
          this.profitList.push(res.data.profitList[i])
        }
        this.hasNext1 = res.data.hasNext
        this.pageIndex1++
      }
    },
    loadData2: async function () {
      const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/histories', {'page_no': this.pageIndex2, 'page_size': this.pageSize2})
      if (res.data.fstat) {
        if (this.pageIndex2 === 1) {
          this.fundHistoryList = []
        }
        for (let i = 0; i < res.data.fundHistoryList.length; i++) {
          this.fundHistoryList.push(res.data.fundHistoryList[i])
        }
        this.hasNext2 = res.data.hasNext
        this.pageIndex2++
      }
    },
    showTab: function (e) {
      if (e === 'a') {
        this.a = true
        this.b = false
      }
      if (e === 'b') {
        this.a = false
        this.b = true
      }
      if (e === 'c') {
        this.c = true
        this.d = false
      }
      if (e === 'd') {
        this.c = false
        this.d = true
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
</style>
