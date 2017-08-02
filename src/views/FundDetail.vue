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
              <router-link :to="{ name: 'detailhistory', params: {id:fundid,code:innercode} }" class="arrow pull-right">查看历史净值</router-link>
          </div>
          <div class="tab clearfix">
              <a href="javascript:void(0)" class="current">近一月</a>
              <a href="javascript:void(0)">近三月</a>
              <a href="javascript:void(0)">近六月</a>
              <a href="javascript:void(0)">近一年</a>
          </div>
      </div>
      <div class="box">
          <router-link class="t clearfix" :to="{ name: 'traderule/mrgz', params: {id:fundid,code:innercode} }"><h3 class="title pull-left">交易规则</h3></router-link>
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
              <router-link :to="{ name: 'fundrecord/info', params: {id:fundid} }" class="arrow text-medium pull-right">概况、公告、持仓、行业、分红</router-link>
          </div>
          <ul class="info">
              <li>基金名称：{{fundsname}}</li>
              <li>基金代码：{{fundcode}}</li>
          </ul>
      </div>
      <div class="bt">
        <router-link :to="{ name: 'order', params: {'id':fundid} }" class="btn btn-block btn-red" v-if="isOpenAccount && isRisk">投</router-link>
        <a href="javascript:void(0)" v-else-if="!isRisk && isOpenAccount" class="btn btn-block btn-red" @click="openRiskDialog()">投</a>
        <router-link v-else :to="{ name: 'openfundaccount', params: {'id':fundid} }" class="btn btn-block btn-red">投</router-link>
      </div>
      <div class="popbg" id="popbg" style="display:none;" v-show="isRisk"></div>
      <div class="popwin" style="display:none;" v-show="isRisk">
        <div class="con w">
          <p>为保护您的投资权益，根据相关规定，您必须完成风险测评，如未完成，将不能向您提供基金产品及服务</p>
          <div class="bt clearfix text-center">
            <router-link :to="{ name: 'risktest'}" class="btn btn-red">去风险测评</router-link>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fundid: '',
      innercode: '', // 基金内部代码
      fundsname: '', // 基金短名称
      fundcode: '', // 基金代码
      unit_NET_CHNG_PCT: '', // 日涨幅
      unit_net: '', // 最新净值
      fundrisk: '', // 基金风险等级
      isOpenAccount: true, // 是否开户 false表示未开户
      isRisk: false // 是否进行过风险测试
    }
  },
  created: async function () {
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
  },
  methods: {
    openRiskDialog: function () {
      this.isRisk = true
    }
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
