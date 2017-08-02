<template lang="html">
<div class="bankPage">
  <ul class="list" v-if="bank">
    <li>
      <img src="//a.yilucaifu.com/public/wo/images/card502.png" alt="" class="img"/>
      <p>交通银行</p>
      <p class="num"><span class="it">****</span><span class="it">****</span><span class="it">****</span><span class="it">****</span>3258</p>
    </li>
  </ul>
  <router-link :to="{ name: 'openfundaccount'}" v-else class="btn btn-white btn-block">开通基金帐户</router-link>
</div>
</template>

<script>
export default {
  data () {
    return {

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
