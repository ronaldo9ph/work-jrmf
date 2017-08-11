<template lang="html">
  <div class="fundDetail" id="fundDetail">
      <div class="top">
          <h1 class="name">{{fundsname}}（{{fundcode}}）</h1>
          <ul class="item clearfix">
              <li>
                  <p>日涨幅</p>
                  <p>{{unit_NET_CHNG_PCT}}%</p>
              </li>
              <li>
                  <p>最新净值</p>
                  <p>{{unit_net}}</p>
              </li>
              <li>
                  <p>指数型基金</p>
                  <p>{{fundrisk}}</p>
              </li>
          </ul>
      </div>
      <div class="box chart">
          <div class="t clearfix">
              <h3 class="title pull-left">净值走势</h3>
              <router-link :to="{ name: 'detailhistory', params: {id:fundcode} }" class="arrow pull-right">查看历史净值</router-link>
          </div>
          <div class="tab clearfix">
              <a href="javascript:void(0)" @click="drawChart(1)" :class="isActive==1?'current':''">近一月</a>
              <a href="javascript:void(0)" @click="drawChart(3)" :class="isActive==3?'current':''">近三月</a>
              <a href="javascript:void(0)" @click="drawChart(6)" :class="isActive==6?'current':''">近六月</a>
              <a href="javascript:void(0)" @click="drawChart(12)" :class="isActive==12?'current':''">近一年</a>
          </div>
          <x-chart :id="id" :option="options" ref="chart"></x-chart>
      </div>
      <div class="box">
          <router-link class="t clearfix" :to="{ name: 'traderule/mrgz', params: {id:fundcode} }"><h3 class="title pull-left">交易规则</h3></router-link>
          <div class="con">
          <div class="procon">
              <div class="line"></div>
              <table class="tb">
                  <tr>
                      <td>买入提交</td>
                      <td>确认份额</td>
                      <td class="text-right">查看盈亏</td>
                  </tr>
                  <tr>
                      <td><span class="circle"></span></td>
                      <td><span class="circle"></span></td>
                      <td class="text-right"><span class="circle"></span></td>
                  </tr>
                  <tr>
                      <td>T日</td>
                      <td>T+1</td>
                      <td class="text-right">T+1当日净值更新后</td>
                  </tr>
              </table>
          </div>
      </div>
      </div>
      <div class="box">
          <div class="t clearfix">
              <h3 class="title text-medium pull-left">基金档案</h3>
              <router-link :to="{ name: 'fundrecord/info', params: {id:fundcode} }" class="arrow text-medium pull-right">概况、公告、持仓、行业、分红</router-link>
          </div>
          <ul class="info">
              <li>基金名称：{{fundsname}}</li>
              <li>基金代码：{{fundcode}}</li>
          </ul>
      </div>
      <div class="bt">
        <router-link :to="{ name: 'order', params: {'id':fundcode} }" class="btn btn-block btn-red" v-if="isOpenAccount==2">投</router-link>
        <a href="javascript:void(0)" v-if="isOpenAccount==1 || isOpenAccount==0" class="btn btn-block btn-red" @click="openDialog()">投</a>
      </div>
      <div class="popbg" id="popbg" style="display:none;" v-show="isShow"></div>
      <div class="popwin" style="display:none;" v-show="isShow">
        <div class="con w" v-show="isOpenAccount!=1">
          <p>为保护您的投资权益，根据相关规定，您必须完成风险测评，如未完成，将不能向您提供基金产品及服务</p>
          <div class="bt clearfix text-center">
            <router-link :to="{ name: 'risktest'}" class="btn btn-red">去风险测评</router-link>
          </div>
        </div>
        <div class="con w" v-show="isOpenAccount==0">
          <p>鉴于您首次购买基金，为了您的资金安全。请先完善您的个人信息，方便您购买合适的产品或服务。</p>
          <div class="bt clearfix text-center">
            <a href="javascript:void(0)" @click="close()" class="btn btn-white">取消购买</a>
            <router-link :to="{ name: 'openfundaccount'}" class="btn btn-red">去完善</router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// 导入chart组件
import HighCharts from 'highcharts/highstock'
import XChart from '../components/Chart.vue'
export default {
  data () {
    return {
      fundid: '',
      fundsname: '', // 基金短名称
      fundcode: '', // 基金代码
      unit_NET_CHNG_PCT: '', // 日涨幅
      unit_net: '', // 最新净值
      fundrisk: '', // 基金风险等级
      isOpenAccount: '', // -1，禁用用户 0,未开户 1,未进行风险测评 2,已开户，已设置交易密码,已进行风险
      isRisk: false, // 是否进行过风险测试
      isShow: false,
      isActive: 1, // chart selected
      id: 'container',
      data: [],
      options: {
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
        series: [{
          name: ' ',
          data: 'aa',
          type: 'spline',
          tooltip: {
            valueDecimals: 2
          }
        }]
      }
    }
  },
  created: async function () {
    this.drawChart(1)
    const res = await this.$http.get('api/v1/funds/' + this.$route.params.id)
    if (res.data.fstat) {
      this.fundid = res.data.fundid
      this.innercode = res.data.innercode
      this.fundsname = res.data.fundinfo.fundsname
      this.fundcode = res.data.fund_code
      this.unit_NET_CHNG_PCT = res.data.unit_net_chng_pct
      this.unit_net = res.data.unit_net
      this.fundrisk = res.data.fundrisk
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
    }
    const result = await this.$http.get('api/v1/funds/accounts')
    if (result.data.fstat) {
      this.isOpenAccount = result.data.openAccountStatus
    }
  },
  methods: {
    openDialog: function () {
      this.isShow = true
    },
    close: function () {
      this.isShow = false
    },
    drawChart: async function (id) {
      this.isActive = id
      const res = await this.$http.get('api/v1/funds/holdings/' + this.$route.params.id + '/fund-unitnets', {'month': id})
      if (res.data.fstat) {
        this.data = []
        for (let i = 0; i < res.data.unitnetList.length; i++) {
          this.data[i] = res.data.unitnetList[i]
        }
      } else {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
      // console.log(this.options.colors)
      this.options.series[0].data = this.data
      let _Highcharts = HighCharts
      let chart = new _Highcharts.StockChart(this.$refs.chart.$el, this.options)
      console.log(chart)
    }
  },
  components: {
    XChart
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
