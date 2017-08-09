<template lang="html">
<ul class="setting">
  <li>
    <router-link :to="{ name: 'bank'}" class="bank">银行卡</router-link>
  </li>
  <li>
    <router-link :to="{ name: 'risktest'}" class="risk">风险测试</router-link>
  </li>
  <li>
    <router-link :to="{ name: 'password'}" class="pas" v-if="openAccountStatus==2">支付密码</router-link>
    <a href="javascript:void(0)" @click="toast()" class="pas" v-if="openAccountStatus==0">支付密码</a>
  </li>
</ul>
</template>

<script>
export default {
  data () {
    return {
      openAccountStatus: '' // 开户状态
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/accounts')
    if (res.data.fstat) {
      this.openAccountStatus = res.data.openAccountStatus
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  },
  methods: {
    toast: function () {
      this.$vux.toast.text('请先开通基金账户', 'middle')
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
