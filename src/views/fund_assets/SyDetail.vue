<template lang="html">
<div class="syDetail">
  <ul class="list">
    <li class="clearfix">
      <span class="time pull-left">2017-09-08</span>
      <span class="text-red pull-right">+0.99</span>
    </li>
    <li class="clearfix">
      <span class="time pull-left">2017-09-09</span>
      <span class="text-green pull-right">-0.99</span>
    </li>
  </ul>
  <p class="text-gray text-center pad">暂无数据！</p>
  <div class="pad text-center">
    <a href="javascript:void(0)" class="text-gray">点击加载更多</a>
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
@import '../../styles/style.less';
</style>
