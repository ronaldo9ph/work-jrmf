<template lang="html">
  <div class="redeemSuc">
    <p class="w"><i></i>订单提交成功</p>
    <div class="box">
      <div class="line"></div>
      <div class="it"><i><em></em></i>赎回申请已提交</div>
      <div class="it mid"><i></i><p>等待基金公司确认</p><p class="text-gray text-normal">如遇节假日，基金公司确认时间将会延后</p></div>
      <div class="it"><i></i>赎回份额到帐可查询</div>
    </div>
    <div class="padbox">
      <router-link :to="{ name: 'fundindex'}" class="btn btn-red btn-block">返回首页</router-link>
    </div>
    <div class="padbox text-gray text-normal">
      <p>温馨提示：</p>
      <p>赎回到帐时间：货币基金的赎回到帐时间一般为T+2个工作日，非货币（股票型、混合型、债券型、指数型）基金的赎回到帐时间一般为T+4~5个工作日，
        QDII型基金赎回款到帐时间一般为T+7~10个工作日，如遇法定节假日，到帐时间将会延后，具体到帐时间请以银行划款时间为准。（注：T为赎回操作日）</p>
    </div>
  </div>
</template>

<style lang="less">
@import '../../styles/style.less';
</style>
