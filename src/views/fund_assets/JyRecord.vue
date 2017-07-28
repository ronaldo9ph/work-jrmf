<template lang="html">
  <div class="syDetail">
    <ul class="list">
      <li class="clearfix">
        <div class="pull-left">
          <p>申购确认</p>
          <p class="text-gray">2017-09-08</p>
        </div>
        <div class="text-right pull-right">
          <p>1000</p>
          <p>确认成功</p>
        </div>
      </li>
      <li class="clearfix">
        <div class="pull-left">
          <p>申购确认</p>
          <p class="text-gray">2017-09-08</p>
        </div>
        <div class="text-right pull-right">
          <p>1000</p>
          <p>确认成功</p>
        </div>
      </li>
    </ul>
    <p class="text-gray text-center pad">暂无数据！</p>
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
