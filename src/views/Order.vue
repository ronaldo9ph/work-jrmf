<template lang="html">
<div class="orderPage">
  <div class="top">
    <div class="tp clearfix">
      <h1 class="h1t pull-left">{{FUNDNAME}}({{FUND_CODE}})</h1>
      <span class="tag pull-right">{{Fund_type}}</span>
    </div>
    <div class="bt clearfix">
      <div class="item pull-left">
        <p>单位净值：{{UNIT_NET}}</p>
        <p>日涨幅：{{UNIT_NET_CHNG_PCT}}%</p>
      </div>
      <div class="item pull-left">
        <p>起购金额：{{QUOTA}}元</p>
        <p v-if="FUND_RATE==10">手续费：{{CUR_FUND_RATE}}%</p>
        <p v-else="FUND_RATE==10">手续费：{{CUR_FUND_RATE}}%({{chag_rate_up_lim}}%)</p>
      </div>
    </div>
  </div>
  <div class="box bank">
    <img :src="logo_url"  class="img" :alt="bankname"/>
    <p class="t">{{bankname}}(尾号{{bankbook}})</p>
    <p class="text-gray text-normal">单笔限额{{unionPaylimit}}，每日限额{{unionPaylimitSingle}}</p>
  </div>
  <div class="box buyNum">
    <label class="t">购买金额：</label>
    <input type="num" class="txt" :placeholder="'>='+QUOTA" v-model="amount"/>
  </div>
  <input type="hidden" name="bankno" :value="bankno" />
  <div class="padbox sub">
    <button class="btn btn-block btn-red" @click="subFun()">确认支付</button>
  </div>
  <div class="popbg" id="popbg" style="display:none;" v-show="isShow"></div>
  <div class="popwin" id="popwin" style="display:none;" v-show="isShow">
    <div class="con w" v-if="risklevel=='保守型' && !match">
      <p>本基金的风险等级为（高），您的风险测评结果为保守型。</p>
      <p>根据相关规定，最低风险承受能力的用户不得购买高于其风险承受能力的基金产品。</p>
      <div class="bt clearfix">
        <a href="javascript:void(0)" @click="closePopwin()" class="btn btn-white pull-left">取消购买</a>
        <router-link :to="{ name: 'risktest'}" class="btn btn-red pull-right">重新测评</router-link>
      </div>
    </div>
    <div class="con w" v-if="!match && risklevel!='保守型'">
      <p>经核实，您购买的基金风险等级（{{fundriskgrade}}）高于您的风险评测结果（{{risklevel}}），购买该产品，可能导致您承担超出自身承受能力的损失以及不利后果，请你认真考虑风险，审慎购买。</p>
      <div class="bt clearfix">
        <a href="javascript:void(0)" @click="closePopwin()" class="btn btn-white pull-left">取消购买</a>
        <a href="javascript:void(0)" @click="showPas()" class="btn btn-red pull-right">继续购买</a>
      </div>
    </div>
    <div class="con w" v-if="can">
      <p class="text-center" style="margin-bottom:10px">请输入支付密码</p>
      <div>
        <input type="password" name="password" v-model="password" class="txt" />
      </div>
      <div class="text-right">
        <router-link :to="{ name: 'resetpas'}" class="text-blue">忘记交易密码？</router-link>
      </div>
      <div class="bt clearfix">
        <a href="javascript:void(0)" @click="closePopwin()" class="btn btn-white pull-left">取消</a>
        <a href="javascript:void(0)" class="btn btn-red pull-right" @click="subForm()">确定</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  data () {
    return {
      FUNDNAME: '', // 基金名称
      FUND_CODE: '', // 基金代码
      UNIT_NET: '', // 基金净值
      QUOTA_UNIT_MARK: '', // 净值单位
      FUND_RATE: '', // 折扣 10表示未打折
      CUR_FUND_RATE: '', // 当前费率
      chag_rate_up_lim: '', // 原费率
      risklevel: '保守型', // 风测类型
      UNIT_NET_CHNG_PCT: '', // 日涨幅
      fundriskgrade: '高', // 基金风险
      isShow: false, // 弹窗是否显示
      bankname: '', // 银行卡名称
      bankbook: '', // 银行卡号
      logo_url: '', // 银行卡logo
      bankno: '', // 银行代码
      unionPaylimit: '', // 单笔限额
      unionPaylimitSingle: '', // 每日限额
      match: false, // 是否匹配 false为不匹配
      QUOTA: '', // 起购金额
      Fund_type: '', // 基金类型
      can: false, // 密码弹窗是否显示
      password: '', // 密码
      amount: '' // 输入金额
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/orders/' + this.$route.params.id)
    if (res.data.fstat) {
      this.FUNDNAME = res.data.FUNDNAME
      this.FUND_CODE = res.data.FUND_CODE
      this.UNIT_NET = res.data.UNIT_NET
      this.QUOTA_UNIT_MARK = res.data.QUOTA_UNIT_MARK
      this.FUND_RATE = res.data.FUND_RATE
      this.CUR_FUND_RATE = res.data.CUR_FUND_RATE
      this.chag_rate_up_lim = res.data.chag_rate_up_lim
      this.risklevel = res.data.risklevel
      this.UNIT_NET_CHNG_PCT = res.data.UNIT_NET_CHNG_PCT
      this.fundriskgrade = res.data.fundriskgrade
      this.bankname = res.data.fundBank.bankname
      this.bankbook = res.data.fundBank.bankbook.substr(-4, 4)
      this.logo_url = res.data.bankInfo.logo_url
      this.bankno = res.data.bankInfo.bankno
      this.unionPaylimit = res.data.bankInfo.unionPaylimit
      this.unionPaylimitSingle = res.data.bankInfo.unionPaylimitSingle
      this.match = res.data.match
      this.QUOTA = res.data.QUOTA
      this.Fund_type = res.data.Fund_type
    }
  },
  methods: {
    closePopwin: function () {
      this.isShow = false
    },
    subFun: debounce(async function (e) {
      if (this.amount === '') {
        this.$vux.toast.text('请输入购买金额', 'middle')
        return false
      }
      if (!/^[0-9]+.?[0-9]*$/.test(this.amount)) {
        this.$vux.toast.text('购买金额必须为数字', 'middle')
        return false
      }
      if (this.amount < this.QUOTA) {
        this.$vux.toast.text('购买金额必须大于起购金额' + this.QUOTA + '元', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/orders/' + this.$route.params.id)
      if (res.data.fstat) {
        this.risklevel = res.data.risklevel
        this.match = res.data.match
      }
      if (this.match === false) {
        this.isShow = true
      } else {
        this.can = true
        this.isShow = true
      }
    }, 500),
    showPas: function () {
      this.can = true
      this.match = true
      this.risklevel = ''
      this.isShow = true
    },
    subForm: debounce(async function (e) {
      if (this.password === '' || this.password.length !== 6) {
        this.$vux.toast.text('请输入六位数字支付密码', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/' + this.$route.params.id + '/actions/buy', {'transpasswd': this.password, 'applicationamount': this.amount})
      if (res.data.fstat) {
        this.$router.push({path: '/buysuccess/' + this.FUND_CODE})
      }
    }, 500)
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
