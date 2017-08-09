<template lang="html">
<div class="bankPage" v-if="isShow">
  <ul class="list" style="display:none;" v-show="openAccountStatus == 2">
    <li>
      <img :src="bankLogo" :alt="bankName" class="img"/>
      <p>{{bankName}}</p>
      <p class="num"><span class="it">****</span><span class="it">****</span><span class="it">****</span><span class="it">****</span>{{bankNo}}</p>
    </li>
  </ul>
  <router-link :to="{ name: 'openfundaccount'}" style="display:none;" v-show="openAccountStatus == 0" class="btn btn-white btn-block">开通基金帐户</router-link>
</div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      bankLogo: '', // 银行LOGO
      bankName: '', // 银行名称
      bankNo: '', // 银行卡号
      openAccountStatus: '' // 开户状态
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/accounts')
    if (res.data.fstat) {
      this.openAccountStatus = res.data.openAccountStatus
      this.bankLogo = res.data.bankLogo
      this.bankName = res.data.bankName
      this.bankNo = res.data.bankNo.substr(-4, 4)
      this.isShow = true
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
