<template lang="html">
<div class="orderPage">
  <div class="top">
    <div class="tp clearfix">
      <h1 class="h1t pull-left">{{fund.FUNDNAME}}({{fund.FUND_CODE}})</h1>
      <span class="tag pull-right">{{fund.Fund_type}}</span>
    </div>
    <div class="bt clearfix" v-if="fund.Fund_type=='货币型'">
      <div class="item pull-left">
        <p>七日年化：{{fund.UNIT_NET}}%</p>
      </div>
      <div class="item pull-left">
        <p v-if="fund.CUR_FUND_RATE==0">免手续费</p>
        <p v-if="fund.FUND_RATE==10 && fund.CUR_FUND_RATE!=0">手续费：{{fund.CUR_FUND_RATE}}%</p>
        <p v-if="fund.FUND_RATE!=10 && fund.CUR_FUND_RATE!=0">手续费：{{fund.CUR_FUND_RATE}}%({{fund.chag_rate_up_lim}}%)<span class="zk">{{fund.FUND_RATE}}折</span></p>
      </div>
    </div>
    <div class="bt clearfix" v-else>
      <div class="item pull-left">
        <p>单位净值：{{fund.UNIT_NET}}</p>
        <p>日涨幅：{{fund.UNIT_NET_CHNG_PCT}}%</p>
      </div>
      <div class="item pull-left">
        <p>起购金额：{{fund.QUOTA}}元</p>
        <p v-if="fund.CUR_FUND_RATE==0">免手续费</p>
        <p v-if="fund.FUND_RATE==10 && fund.CUR_FUND_RATE!=0">手续费：{{fund.CUR_FUND_RATE}}%</p>
        <p v-if="fund.FUND_RATE!=10 && fund.CUR_FUND_RATE!=0">手续费：{{fund.CUR_FUND_RATE}}%({{fund.chag_rate_up_lim}}%)<span class="zk">{{fund.FUND_RATE}}折</span></p>
      </div>
    </div>
  </div>
  <div class="box bank">
    <img :src="fundBank.logo_url"  class="img" :alt="fundBank.bankname"/>
    <p class="t">{{fundBank.bankname}}(尾号{{fundBank.bankbook}})</p>
    <p class="text-gray text-normal">单笔限额{{fundBank.unionPaylimit}}，每日限额{{fundBank.unionPaylimitSingle}}</p>
  </div>
  <div class="box buyNum">
    <label class="t">购买金额：</label>
    <input type="num" class="txt" autocomplete="off" :placeholder="'>='+fund.QUOTA" v-model="amount"/>
  </div>
  <input type="hidden" name="bankno" :value="fundBank.bankno" />
  <div class="padbox sub">
    <button class="btn btn-block btn-red" @click="subFun()">确认支付</button>
  </div>
  <div class="popbg" id="popbg" style="display:none;" v-show="isShow"></div>
  <div class="popwin" id="popwin" style="display:none;" v-show="isShow">
    <div class="con w" v-if="fund.risklevel=='保守型' && !fund.match">
      <p>本基金的风险等级为（高），您的风险测评结果为保守型。</p>
      <p>根据相关规定，最低风险承受能力的用户不得购买高于其风险承受能力的基金产品。</p>
      <div class="bt clearfix">
        <a href="javascript:void(0)" @click="closePopwin()" class="btn btn-white pull-left">取消购买</a>
        <router-link :to="{ name: 'risktest'}" class="btn btn-red pull-right">重新测评</router-link>
      </div>
    </div>
    <div class="con w" v-if="!fund.match && fund.risklevel!='保守型'">
      <p>经核实，您购买的基金风险等级（{{fund.fundriskgrade}}）高于您的风险评测结果（{{fund.risklevel}}），购买该产品，可能导致您承担超出自身承受能力的损失以及不利后果，请你认真考虑风险，审慎购买。</p>
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
        <router-link :to="{ name: 'resetpas'}" class="text-blue">忘记支付密码？</router-link>
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
      fund: {
        FUNDNAME: '', // 基金名称
        FUND_CODE: '', // 基金代码
        UNIT_NET: '', // 基金净值
        QUOTA_UNIT_MARK: '', // 净值单位
        FUND_RATE: 0, // 折扣 10表示未打折
        CUR_FUND_RATE: 0, // 当前费率
        chag_rate_up_lim: '', // 原费率
        risklevel: '保守型', // 风测类型
        UNIT_NET_CHNG_PCT: '', // 日涨幅
        fundriskgrade: '高', // 基金风险
        match: false, // 是否匹配 false为不匹配
        QUOTA: '', // 起购金额
        Fund_type: '' // 基金类型
      },
      fundBank: {
        bankname: '', // 银行卡名称
        bankbook: '', // 银行卡号
        logo_url: '', // 银行卡logo
        bankno: '', // 银行代码
        unionPaylimit: '', // 单笔限额
        unionPaylimitSingle: '' // 每日限额
      },
      isShow: false, // 弹窗是否显示
      can: false, // 密码弹窗是否显示
      password: '', // 密码
      amount: '' // 输入金额
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/orders/' + this.$route.params.id)
    if (res.data.fstat) {
      this.fund.FUNDNAME = res.data.FUNDNAME
      this.fund.FUND_CODE = res.data.FUND_CODE
      this.fund.UNIT_NET = res.data.UNIT_NET
      this.fund.QUOTA_UNIT_MARK = res.data.QUOTA_UNIT_MARK
      this.fund.FUND_RATE = res.data.FUND_RATE
      this.fund.CUR_FUND_RATE = res.data.CUR_FUND_RATE
      this.fund.chag_rate_up_lim = res.data.chag_rate_up_lim
      this.fund.risklevel = res.data.risklevel
      this.fund.UNIT_NET_CHNG_PCT = res.data.UNIT_NET_CHNG_PCT
      this.fund.fundriskgrade = res.data.fundriskgrade
      this.fund.match = res.data.match
      this.fund.QUOTA = res.data.QUOTA
      this.fund.Fund_type = res.data.Fund_type
      this.fundBank.bankname = res.data.fundBank.bankname
      this.fundBank.bankbook = res.data.fundBank.bankbook.substr(-4, 4)
      this.fundBank.logo_url = res.data.bankInfo.logo_url
      this.fundBank.bankno = res.data.bankInfo.bankno
      this.fundBank.unionPaylimit = res.data.bankInfo.unionPaylimit
      this.fundBank.unionPaylimitSingle = res.data.bankInfo.unionPaylimitSingle
    }
  },
  methods: {
    closePopwin: function () {
      this.isShow = false
      this.can = false
    },
    subFun: debounce(async function (e) {
      if (this.amount === '') {
        this.$vux.toast.text('请输入购买金额', 'middle')
        return false
      }
      if (this.amount < this.fund.QUOTA) {
        this.$vux.toast.text('购买金额必须大于起购金额' + this.fund.QUOTA + '元', 'middle')
        return false
      }
      if (!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(this.amount)) {
        this.$vux.toast.text('金额输入有误', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/orders/' + this.$route.params.id)
      if (res.data.fstat) {
        this.fund.risklevel = res.data.risklevel
        this.fund.match = res.data.match
      }
      if (this.fund.match === false) {
        this.isShow = true
      } else {
        this.can = true
        this.isShow = true
      }
    }, 500),
    showPas: function () {
      this.can = true
      this.fund.match = true
      this.fund.risklevel = ''
      this.isShow = true
    },
    subForm: debounce(async function (e) {
      if (this.password === '' || this.password.length !== 6) {
        this.$vux.toast.text('请输入六位数字支付密码', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/' + this.$route.params.id + '/actions/buy', {'transpasswd': this.password, 'applicationamount': this.amount})
      if (res.data.fstat === 1) {
        this.$router.push({path: '/buysuccess/' + this.fund.FUND_CODE})
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
