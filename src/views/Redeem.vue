<template lang="html">
  <div class="orderPage redeem">
    <div class="top">
      <div class="tp clearfix">
        <h1 class="h1t pull-left">{{fundname}}({{fundcode}})</h1>
        <span class="tag pull-right">{{fundtype}}</span>
      </div>
      <div class="bt clearfix">
        <div class="item pull-left">目前持有：{{availablevol}}份</div>
        <div class="item pull-left">可赎回份额：{{availablevol-disableVol}}份</div>
      </div>
    </div>
    <div class="box bank">
      <img :src="bankLogo"  class="img" :alt="bankName"/>
      <p class="t">{{bankName}}(尾号{{bankbook}})</p>
    </div>
    <div class="box buyNum">
      <label class="t">赎回份额：</label>
      <input type="num" class="txt" :placeholder="'>='+minredemptionvol" v-model="amount" />
      <a href="javascript:void(0)" class="btn btn-white" @click="Redeem(availablevol-disableVol)">全部赎回</a>
    </div>
    <p class="text-gray padbox w">最低赎回份额为：{{minredemptionvol}}份；最低持有份额为：{{minaccountbalance}}份。若赎回后剩余持有份额低于最低持有份额，请全部赎回。</p>
    <div class="padbox sub">
      <button class="btn btn-block btn-red" @click="subFun()">确定赎回</button>
    </div>
    <div class="popbg" id="popbg" style="display:none;" v-show="isShow"></div>
    <div class="popwin" style="display:none;" v-show="isShow">
      <h3 class="t">交易密码</h3>
      <div class="con">
        <input type="password" class="txt" placeholder="请输入支付密码" v-model="password"/>
        <div class="text-right">
          <router-link :to="{ name: 'findpas'}" class="text-normal">忘记交易密码?</router-link>
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
export default {
  data () {
    return {
      fundtype: '',
      isShow: false, // 交易密码弹窗是否显示
      bankName: '', // 银行名称
      bankLogo: '', // 银行logo
      bankbook: '', // 银行卡号
      fundname: '', // 基金名称
      fundcode: '', // 基金code
      availablevol: '', // 持有份额
      disableVol: '', // 冻结份额
      minredemptionvol: '', // 基金最少赎回份数
      minaccountbalance: '', // 基金最低持有份数
      maxredemptionvol: '', // 基金最高赎回份数
      amount: ' ', // 可赎回份额
      password: '' // 密码
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/redeem-orders/' + this.$route.params.id)
    if (res.data.fstat) {
      this.bankName = res.data.bankName
      this.bankLogo = res.data.bankLogo
      this.bankbook = res.data.depositacct.substr(-4, 4)
      this.fundname = res.data.pingan_fund.fundname
      this.fundcode = res.data.pingan_fund.fundcode
      this.fundtype = res.data.pingan_fund.fundtypedesc
      this.availablevol = res.data.availablevol
      this.minredemptionvol = res.data.pingan_fundlimit.minredemptionvol
      this.minaccountbalance = res.data.pingan_fundlimit.minaccountbalance
      this.maxredemptionvol = res.data.pingan_fundlimit.maxredemptionvol
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
      if (this.availablevol - this.amount < this.minaccountbalance * 1) {
        this.$vux.toast.text('基金最低持有份数为' + this.minaccountbalance + '份，请全部赎回', 'middle')
        return false
      }
      if (this.amount * 1 < this.minredemptionvol * 1) {
        this.$vux.toast.text('基金最少赎回份数为' + this.minredemptionvol, 'middle')
        return false
      }
      if (this.amount * 1 > this.maxredemptionvol * 1) {
        this.$vux.toast.text('基金最高赎回份数为' + this.maxredemptionvol, 'middle')
        return false
      }
      this.isShow = true
    },
    Redeem: function (e) {
      this.amount = e
    },
    subForm: async function () {
      if (this.password === '' || this.password.length !== 6) {
        this.$vux.toast.text('请输入六位数字支付密码', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/' + this.$route.params.id + '/actions/redeem', {'transpasswd': this.password, 'applicationvol': this.amount, 'availablevol': this.availablevol - this.disableVol})
      if (res.data.fstat) {
        this.$router.push({path: '/redeemsuccess/' + this.fundcode})
      } else {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    }
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
