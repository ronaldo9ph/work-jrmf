<template lang="html">
<div class="riskQuestion">
  <div class="num">
    <em class="cur">1</em>/10
  </div>
  <h3 class="t">您所处的年龄段是?</h3>
  <ul class="list">
    <li class="selected">30岁以下</li>
    <li>30岁以上40岁以下</li>
    <li>40岁以上50岁以下</li>
    <li>50岁以上60岁以下</li>
    <li>60岁以上</li>
  </ul>
  <div class="padbox">
    <router-link :to="{ name: ''}" class="btn btn-block">上一题</router-link>
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
@import '../../styles/setting.less';
</style>
