<template lang="html">
  <div class="orderPage redeem">
    <div class="top">
      <div class="tp clearfix">
        <h1 class="h1t pull-left">{{fund.fundname}}({{fund.fundcode}})</h1>
        <span class="tag pull-right">{{fund.fundtype}}</span>
      </div>
      <div class="bt clearfix">
        <div class="item pull-left">目前持有：{{fund.availablevol}}份</div>
        <div class="item pull-left">可赎回份额：{{fund.availablevol-fund.disableVol}}份</div>
      </div>
    </div>
    <div class="box bank">
      <img :src="fundBank.bankLogo"  class="img" :alt="fundBank.bankName"/>
      <p class="t">{{fundBank.bankName}}(尾号{{fundBank.bankbook}})</p>
    </div>
    <div class="box buyNum">
      <label class="t">赎回份额：</label>
      <input type="num" class="txt" :placeholder="'>='+fund.minredemptionvol" v-model="amount" />
      <a href="javascript:void(0)" class="btn btn-white" @click="Redeem(fund.availablevol-fund.disableVol)">全部赎回</a>
    </div>
    <p class="text-gray padbox w">最低赎回份额为：{{fund.minredemptionvol}}份；最低持有份额为：{{fund.minaccountbalance}}份。若赎回后剩余持有份额低于最低持有份额，请全部赎回。</p>
    <div class="padbox sub">
      <button class="btn btn-block btn-red" @click="subFun()">确定赎回</button>
    </div>
    <div class="popbg" id="popbg" style="display:none;" v-show="isShow"></div>
    <div class="popwin" style="display:none;" v-show="isShow">
      <h3 class="t">支付密码</h3>
      <div class="con">
        <input type="password" class="txt" placeholder="请输入支付密码" v-model="password"/>
        <div class="text-right">
          <router-link :to="{ name: 'resetpas'}" class="text-normal">忘记支付密码?</router-link>
        </div>
        <div class="bt clearfix">
          <a href="javascript:void(0)" @click="closePopwin()" class="btn btn-white pull-left">取消</a>
          <a href="javascript:void(0)" class="btn btn-red pull-right" @click="subForm()">确认赎回</a>
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
      fund: {
        fundtype: '',
        fundname: '', // 基金名称
        fundcode: '', // 基金code
        availablevol: '', // 持有份额
        disableVol: '', // 冻结份额
        minredemptionvol: '', // 基金最少赎回份数
        minaccountbalance: '', // 基金最低持有份数
        maxredemptionvol: '', // 基金最高赎回份数
        amount: ' ' // 可赎回份额
      },
      fundBank: {
        bankName: '', // 银行名称
        bankLogo: '', // 银行logo
        bankbook: '' // 银行卡号
      },
      isShow: false, // 支付密码弹窗是否显示
      password: '' // 密码
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/redeem-orders/' + this.$route.params.id)
    if (res.data.fstat === 1) {
      this.fundBank.bankName = res.data.bankName
      this.fundBank.bankLogo = res.data.bankLogo
      this.fundBank.bankbook = res.data.depositacct.substr(-4, 4)
      this.fund.fundname = res.data.pingan_fund.fundname
      this.fund.fundcode = res.data.pingan_fund.fundcode
      this.fund.fundtype = res.data.pingan_fund.fundtypedesc
      this.fund.availablevol = res.data.availablevol
      this.fund.minredemptionvol = res.data.pingan_fundlimit.minredemptionvol
      this.fund.minaccountbalance = res.data.pingan_fundlimit.minaccountbalance
      this.fund.maxredemptionvol = res.data.pingan_fundlimit.maxredemptionvol
    }
    if (res.data.fstat === 9) {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  },
  methods: {
    closePopwin: function () {
      this.isShow = false
    },
    subFun: function () {
      if (this.amount === '') {
        this.$vux.toast.text('请输入赎回份额', 'middle')
        return false
      }
      if (!/^[0-9]+.?[0-9]*$/.test(this.amount)) {
        this.$vux.toast.text('赎回份额必须为数字', 'middle')
        return false
      }
      if (this.fund.availablevol - this.amount < this.fund.minaccountbalance * 1 && this.fund.availablevol - this.amount !== 0) {
        this.$vux.toast.text('基金最低持有份数为' + this.fund.minaccountbalance + '份，请全部赎回', 'middle')
        return false
      }
      if (this.amount * 1 < this.fund.minredemptionvol * 1) {
        this.$vux.toast.text('基金最少赎回份数为' + this.fund.minredemptionvol, 'middle')
        return false
      }
      if (this.amount * 1 > this.fund.maxredemptionvol * 1) {
        this.$vux.toast.text('基金最高赎回份数为' + this.fund.maxredemptionvol, 'middle')
        return false
      }
      this.isShow = true
    },
    Redeem: function (e) {
      this.amount = e
    },
    subForm: debounce(async function (e) {
      if (this.password === '' || this.password.length !== 6) {
        this.$vux.toast.text('请输入六位数字支付密码', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/' + this.$route.params.id + '/actions/redeem', {'transpasswd': this.password, 'applicationvol': this.amount, 'availablevol': this.fund.availablevol - this.fund.disableVol})
      if (res.data.fstat === 1) {
        this.$router.push({path: '/redeemsuccess/' + this.fund.fundcode})
      }
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    }, 500)
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
</style>
