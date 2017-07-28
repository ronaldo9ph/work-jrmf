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
      <img src="//a.yilucaifu.com/images/cards/mobile/405.png"  class="img" alt=""/>
      <p class="t">招商银行(尾号5505)</p>
    </div>
    <div class="box buyNum">
      <label class="t">购买金额：</label>
      <input type="num" class="txt" placeholder=">=10.00" />
      <a href="javascript:void(0)" class="btn btn-white">全部赎回</a>
    </div>
    <p class="text-gray padbox w">最低赎回份额为：10.00份；最低持有份额为：10.00份。若赎回后剩余持有份额低于最低持有份额，请全部赎回。</p>
    <div class="padbox sub">
      <button class="btn btn-block btn-red">确定赎回</button>
    </div>
    <div class="popbg" id="popbg"></div>
    <div class="popwin">
      <h3 class="t">交易密码</h3>
      <div class="con">
        <input type="password" class="txt" placeholder="请输入支付密码"/>
        <div class="text-right">
          <router-link :to="{ name: 'findpas'}" class="text-normal">忘记交易密码?</router-link>
        </div>
        <div class="bt clearfix">
          <a href="javascript:void(0)" data-close class="btn btn-white pull-left">取消</a>
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
      bank:''
    }
  },
  created: async function () {
    const res = await this.$http.post('')
    if (res) {

    }
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
