<template lang="html">
<div class="fund-assets">
  <div class="top">
    <table class="tb">
      <tr>
        <td colspan="3" class="text-x-large name">{{fund.fundname}}（{{fund.fundcode}}）</td>
      </tr>
      <tr>
        <td>
          <p>市值（元）</p>
          <p class="num">{{fund.minredemptionvol}}</p>
        </td>
        <td>
          <p>最新净值（{{fund.lastDate}}）</p>
          <p class="num">{{fund.nav}}</p>
        </td>
        <td>
          <p>持有份额（份）</p>
          <p class="num">{{fund.currentshare}}</p>
        </td>
      </tr>
    </table>
  </div>
  <div class="box clearfix item text-center">
    <div class="it pull-left">
      <p class="text-gray t">日收益率</p>
      <p class="text-red">{{fund.yestDprofit}}元({{fund.yestdPct}}%)</p>
    </div>
    <div class="it pull-left">
      <p class="text-gray t">持仓收益率</p>
      <p class="text-red">{{fund.holdProfit}}元({{fund.holdPec}}%)</p>
    </div>
  </div>
  <div class="box chtBox">
    <tab :line-width="2" custom-bar-width="60px" active-color='#ef5643'>
      <tab-item selected @on-item-click="drawChart(1,1)"><span v-if="fund.fundtype!='货币型'">单位净值</span><span v-else>七日年化</span></tab-item>
      <tab-item @on-item-click="drawChart(2,1)"><span v-if="fund.fundtype!='货币型'">累积盈亏</span><span v-else>万份收益</span></tab-item>
    </tab>
    <div class="chtCon">
      <x-chart :id="id" :option="options" ref="chart"></x-chart>
      <input type="hidden" v-model="selType" />
      <div class="tbg">
        <a href="javascript:void(0)" :class="selType==1?'current disabled':''" @click="drawChart('',1)">月</a><span class="line"></span>
        <a href="javascript:void(0)" :class="selType==3?'current disabled':''" @click="drawChart('',3)">季</a><span class="line"></span>
        <a href="javascript:void(0)" :class="selType==6?'current disabled':''" @click="drawChart('',6)">半年</a><span class="line"></span>
        <a href="javascript:void(0)" :class="selType==12?'current disabled':''" @click="drawChart('',12)">年</a>
      </div>
    </div>
  </div>
  <div class="box chtBox">
    <tab :line-width="2" custom-bar-width="60px" active-color='#ef5643'>
      <tab-item selected   @on-item-click="showTab('a')">收益明细</tab-item>
      <tab-item  @on-item-click="showTab('b')">交易记录</tab-item>
    </tab>
    <div class="syDetail" v-show="a">
      <ul class="list" v-if="profitList.length>0">
        <li class="clearfix" v-for="item in profitList">
          <span class="time pull-left">{{item.createtime}}</span>
          <span class="text-red pull-right" v-if="item.newprofit>=0">+{{item.newprofit}}</span>
          <span class="text-green pull-right" v-else>{{item.newprofit}}</span>
        </li>
      </ul>
      <p class="text-gray text-center pad" v-else>暂无数据！</p>
      <div class="pad text-center" v-if="hasNext1">
        <a href="javascript:void(0)" class="text-gray" @click="loadData1()">点击加载更多</a>
      </div>
    </div>
    <div class="syDetail" v-show="b">
      <ul class="list" v-if="fundHistoryList.length>0">
        <li class="clearfix" v-for="item in fundHistoryList">
          <div class="pull-left">
            <p>{{item.businessname}}</p>
            <p class="text-gray">{{item.transactiondate}}</p>
          </div>
          <div class="text-right pull-right">
            <p>{{item.confirmedamount}}</p>
            <p>{{item.applystname}}</p>
          </div>
        </li>
      </ul>
      <p class="text-gray text-center pad" v-else>暂无数据！</p>
      <div class="pad text-center" v-if="hasNext2">
        <a href="javascript:void(0)" class="text-gray" @click="loadData2()">点击加载更多</a>
      </div>
    </div>
  </div>
  <div class="fixedbar clearfix">
    <router-link :to="{ name: 'order', params: {'id':fund.fundcode} }" v-if="fund.fundstatus=='可申购赎回'">投</router-link>
    <a href="javascript:void(0)" class="disabled" v-else>投</a>
    <router-link :to="{ name: 'redeem', params: {'id':fund.fundcode} }" v-if="fund.canRedeem">赎回</router-link>
    <a href="javascript:void(0)" class="disabled" v-else>赎回</a>
  </div>
</div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
// 导入chart组件
import HighCharts from 'highcharts/highstock'
import XChart from '../../components/Chart.vue'
import options from '../chart'
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    XChart
  },
  data () {
    return {
      fund: {
        fundname: '', // 基金名称
        fundtype: '', // 基金类型
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
        fundstatus: '' // 是否可投
      },
      a: true, // 显示收益明细
      b: false, // 显示交易记录
      index: 0,
      pageIndex1: 1, // 下一页页码
      pageIndex2: 1, // 下一页页码
      pageSize1: 10, // 每页显示个数
      pageSize2: 5, // 每页显示个数
      hasNext1: false, // 是否有下一页
      profitList: [], // 收益明细列表
      hasNext2: false, // 是否有下一页
      fundHistoryList: [], // 收益明细列表
      selType: 1, // 折线图一个月1、三个月3、六个月6、一年12
      type: 1, // 单位净值c，累积净值d
      id: 'container',
      data: [],
      options: {
        chart: {
          height: 200
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        }
      }
    }
  },
  created: async function () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.drawChart(1, 1)
    this.loadData1()
    this.loadData2()
    const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id)
    if (res.data.fstat === 1) {
      this.fund.fundname = res.data.fund.fundname
      this.fund.fundtype = res.data.fund.fundtype
      this.fund.fundcode = res.data.fund.fundcode
      this.fund.minredemptionvol = res.data.fund.minredemptionvol
      this.fund.lastDate = res.data.fund.lastDate
      this.fund.currentshare = res.data.fund.currentshare
      this.fund.holdPec = res.data.fund.holdPec
      this.fund.holdProfit = res.data.fund.holdProfit
      this.fund.yestDprofit = res.data.fund.yestDprofit
      this.fund.yestdPct = res.data.fund.yestdPct
      this.fund.nav = res.data.fund.nav
      this.fund.canRedeem = res.data.fund.canRedeem
      this.fund.fundstatus = res.data.fund.fundstatus
    }
    this.$vux.loading.hide()
    if (res.data.fstat === 9) {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  },
  methods: {
    loadData1: async function () {
      const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/incomes', {'page_no': this.pageIndex1, 'page_size': this.pageSize1})
      if (res.data.fstat === 1) {
        if (res.data.profitList.length > 0) {
          if (this.pageIndex1 === 1) {
            this.profitList = []
          }
          for (let i = 0; i < res.data.profitList.length; i++) {
            this.profitList.push(res.data.profitList[i])
          }
          this.hasNext1 = res.data.hasNext
          this.pageIndex1++
        } else {
          this.profitList = []
          this.hasNext1 = false
        }
      }
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    },
    loadData2: async function () {
      const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/histories', {'page_no': this.pageIndex2, 'page_size': this.pageSize2})
      if (res.data.fstat === 1) {
        if (res.data.fundHistoryList.length > 0) {
          if (this.pageIndex2 === 1) {
            this.fundHistoryList = []
          }
          for (let i = 0; i < res.data.fundHistoryList.length; i++) {
            this.fundHistoryList.push(res.data.fundHistoryList[i])
          }
          this.hasNext2 = res.data.hasNext
          this.pageIndex2++
        } else {
          this.fundHistoryList = []
          this.hasNext = false
        }
      }
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    },
    drawChart: async function (type, id) {
      var seriesType = [{name: '', data: []}]
      options.series = seriesType
      this.selType = id
      if (type !== '') {
        this.type = type
      }
      if (this.type === 1) {
        const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/fund-unitnets', {'month': id})
        if (res.data.fstat === 1) {
          this.data = []
          for (let i = 0; i < res.data.unitnetList.length; i++) {
            this.data[i] = res.data.unitnetList[i]
          }
        }
        if (res.data.fstat === 9) {
          this.$vux.toast.text(res.data.respmsg, 'middle')
          return false
        }
      } else {
        const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/fund-navcalc', {'month': id})
        if (res.data.fstat === 1) {
          this.data = []
          for (let i = 0; i < res.data.unitnetList.length; i++) {
            this.data[i] = res.data.unitnetList[i]
          }
        }
        if (res.data.fstat === 9) {
          this.$vux.toast.text(res.data.respmsg, 'middle')
          return false
        }
      }
      options.series[0].data = this.data
      HighCharts.StockChart(this.$refs.chart.$el, options)
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
    }
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
</style>
