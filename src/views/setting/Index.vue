<template lang="html">
<ul class="setting">
  <li>
    <router-link :to="{ name: 'bank'}" class="bank">银行卡</router-link>
  </li>
  <li>
    <router-link :to="{ name: 'risktest'}" class="risk" v-if="openAccountStatus==1">风险测试</router-link>
    <router-link :to="{ name: 'riskresult'}" class="risk" v-if="openAccountStatus==2">风险测试</router-link>
    <a href="javascript:void(0)" @click="toast(openAccountStatus)" class="pas" v-if="openAccountStatus==0 || openAccountStatus==-1">风险测试</a>
  </li>
  <li>
    <router-link :to="{ name: 'password'}" class="pas" v-if="openAccountStatus==2 || openAccountStatus==1">支付密码</router-link>
    <a href="javascript:void(0)" @click="toast(openAccountStatus)" class="pas" v-if="openAccountStatus==0 || openAccountStatus==-1">支付密码</a>
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
    }
  },
  methods: {
    toast: function (id) {
      if (id === 0) {
        this.$vux.toast.text('请先开通基金账户', 'middle')
      } else {
        this.$vux.toast.text('该用户己被禁用', 'middle')
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
