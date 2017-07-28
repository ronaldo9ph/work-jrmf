<template lang="html">
<div class="orderPage">
  <div class="top">
    <div class="tp clearfix">
      <h1 class="h1t pull-left">工银高端制造股票(000793)</h1>
      <span class="tag pull-right">股票型</span>
    </div>
    <div class="bt clearfix">
      <div class="item pull-left">
        <p>单位净值：0.01元</p>
        <p>2017-09-08</p>
      </div>
      <div class="item pull-left">
        <p>起购金额：0.01元</p>
        <p>手续费：0.6%(0.8%)</p>
      </div>
    </div>
  </div>
  <div class="box bank">
    <img src="//a.yilucaifu.com/images/cards/mobile/405.png"  class="img" alt=""/>
    <p class="t">招商银行(尾号5505)</p>
    <p class="text-gray text-normal">单笔限额10万，每日限额10万</p>
  </div>
  <div class="box buyNum">
    <label class="t">购买金额：</label>
    <input type="num" class="txt" placeholder=">=10.00" />
  </div>
  <div class="padbox sub">
    <button class="btn btn-block btn-red">确认支付</button>
  </div>
  <div class="popbg" id="popbg"></div>
  <div class="popwin">
    <!--
    <div class="con w">
      <p>本基金的风险等级为（高），您的风险测评结果为保守型。</p>
      <p>根据相关规定，最低风险承受能力的用户不得购买高于其风险承受能力的基金产品。</p>
      <div class="bt clearfix">
        <a href="javascript:void(0)" data-close class="btn btn-white pull-left">取消购买</a>
        <a href="javascript:void(0)" class="btn btn-red pull-right">重新测评</a>
      </div>
    </div>
  -->
    <div class="con w">
      <p>经核实，您购买的基金风险等级（高）高于您的风险评测结果（成长型），购买该产品，可能导致您承担超出自身承受能力的损失以及不利后果，请你认真考虑风险，审慎购买。</p>
      <div class="bt clearfix">
        <a href="javascript:void(0)" data-close class="btn btn-white pull-left">取消购买</a>
        <a href="javascript:void(0)" class="btn btn-red pull-right">重新测评</a>
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
