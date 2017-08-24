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
      <tab-item selected @on-item-click="drawChart(1,1)"><span v-if="fundtype!='货币型'">单位净值</span><span v-else>七日年划</span></tab-item>
      <tab-item @on-item-click="drawChart(2,1)"><span v-if="fundtype!='货币型'">累积盈亏</span><span v-else>万份收益</span></tab-item>
    </tab>
    <div class="chtCon">
      <x-chart :id="id" :option="option" ref="chart"></x-chart>
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
// 导入chart组件
import HighCharts from 'highcharts/highstock'
import XChart from '../../components/Chart.vue'
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
      fundstatus: '', // 是否可投
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
      option: {}
    }
  },
  created: async function () {
    this.drawChart(1, 1)
    this.loadData1()
    this.loadData2()
    const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id)
    if (res.data.fstat) {
      this.fundname = res.data.fund.fundname
      this.fundtype = res.data.fund.fundtype
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
    drawChart: async function (type, id) {
      var seriesType = [{name: '', data: []}]
      let _Highcharts = HighCharts
      var options = {
        chart: {
          height: 200
        },
        colors: ['#ff6c44'],
        rangeSelector: {
          selected: 1,
          enabled: false
        },
        credits: {
          enabled: false
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            second: '%m-%d',
            minute: '%m-%d',
            hour: '%m-%d',
            day: '%d',
            week: '%y-%m-%d',
            month: '%Y-%m',
            year: '%Y'
          }
        },
        title: {
          text: ''
        },
        tooltip: {
          backgroundColor: '#ef5043',   // 背景颜色
          borderRadius: 4,             // 边框圆角
          shadow: true,                 // 是否显示阴影
          animation: true,               // 是否启用动画效果
          style: {                      // 文字内容相关样式
            color: 'white',
            fontSize: '12px'
          },
          formatter: function () {
            return '<b>' + _Highcharts.dateFormat('%Y-%m-%d', this.x) + '</b><br/><span>净值：' + this.y + '</span>'
          }
        },
        series: seriesType
      }
      this.selType = id
      if (type !== '') {
        this.type = type
      }
      if (this.type === 1) {
        const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/fund-unitnets', {'month': id})
        if (res.data.fstat) {
          this.data = []
          for (let i = 0; i < res.data.unitnetList.length; i++) {
            this.data[i] = res.data.unitnetList[i]
          }
        }
      } else {
        const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/fund-navcalc', {'month': id})
        if (res.data.fstat) {
          this.data = []
          for (let i = 0; i < res.data.unitnetList.length; i++) {
            this.data[i] = res.data.unitnetList[i]
          }
        }
      }
      options.series[0].data = this.data
      _Highcharts.StockChart(this.$refs.chart.$el, options)
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
