<template lang="html">
  <div class="orderPage redeem">
    <div class="top">
      <div class="tp clearfix">
        <h1 class="h1t pull-left">工银高端制造股票(000793)</h1>
        <span class="tag pull-right">股票型</span>
      </div>
      <div class="bt clearfix">
        <div class="item pull-left">目前持有：9685份</div>
        <div class="item pull-left">可赎回份额：9685份</div>
      </div>
    </div>
    <div class="box bank">
      <img src="//a.yilucaifu.com/images/cards/mobile/405.png"  class="img" :alt="bankName"/>
      <p class="t">{{bankName}}(尾号5505)</p>
    </div>
    <div class="box buyNum">
      <label class="t">赎回金额：</label>
      <input type="num" class="txt" placeholder=">=10.00" id="amount" />
      <a href="javascript:void(0)" class="btn btn-white" @click="Redeem('123')">全部赎回</a>
    </div>
    <p class="text-gray padbox w">最低赎回份额为：10.00份；最低持有份额为：10.00份。若赎回后剩余持有份额低于最低持有份额，请全部赎回。</p>
    <div class="padbox sub">
      <button class="btn btn-block btn-red" @click="subFun()">确定赎回</button>
    </div>
    <div class="popbg" id="popbg" style="display:none;" v-show="isShow"></div>
    <div class="popwin" style="display:none;" v-show="isShow">
      <h3 class="t">交易密码</h3>
      <div class="con">
        <input type="password" class="txt" placeholder="请输入支付密码"/>
        <div class="text-right">
          <router-link :to="{ name: 'findpas'}" class="text-normal">忘记交易密码?</router-link>
        </div>
        <div class="bt clearfix">
          <a href="javascript:void(0)" @click="closePopwin()" class="btn btn-white pull-left">取消</a>
          <a href="javascript:void(0)" class="btn btn-red pull-right">确认赎回</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false, // 交易密码弹窗是否显示
      bankName: '', // 银行名称
      availablevol: '' // 可赎回份额
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/redeem-orders/' + this.$route.params.id)
    if (res.data.fstat) {
      this.bankName = res.data.bankName
      this.availablevol = res.data.availablevol
    }
  },
  methods: {
    closePopwin: function () {
      this.isShow = false
    },
    subFun: function () {
      var amount = document.getElementById('amount').value
      if (amount === '' || amount === 'undefine') {
        this.$vux.toast.text('请输入赎回金额', 'middle')
      }
      if (!/^[0-9]*$/.test(amount)) {
        this.$vux.toast.text('赎回金额必须为数字', 'middle')
      }
      if (amount) {
        this.$vux.toast.text('赎回金额必须为数字', 'middle')
      }
    },
    Redeem: function (e) {

    }
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
