<template lang="html">
<div class="detailprofit">
  <div class="top clearfix">
    <div class="item">
      <p class="text-small">日收益(元)</p>
      <p class="num">-0.44</p>
    </div>
    <div class="item">
      <p class="text-small">日收益率(06-28)</p>
      <p class="num">-0.44%</p>
    </div>
  </div>
  <div class="box">
    <h3 class="title"><span class="w">盈利</span></h3>
    <ul class="item">
      <li>
        <a href="#" class="clearfix">
          <span class="name pull-left">嘉实基本面50指数</span>
          <span class="text-red pull-right">+0.44元</span>
        </a>
      </li>
      <li>
        <a href="#" class="clearfix">
          <span class="name pull-left">嘉实基本面50指数</span>
          <span class="text-red pull-right">+0.44元</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="box">
    <h3 class="title"><span class="w">亏损</span></h3>
    <ul class="item">
      <li>
        <a href="#" class="clearfix">
          <span class="name pull-left">嘉实基本面50指数</span>
          <span class="text-green pull-right">-0.44元</span>
        </a>
      </li>
      <li>
        <a href="#" class="clearfix">
          <span class="name pull-left">嘉实基本面50指数</span>
          <span class="text-green pull-right">-0.44元</span>
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created: async function(){
    const res = await this.$http.post('')
    if (res.data) {

    }
  }
}
</script>

<style lang="less">
@import '../styles/index.less';
</style>
