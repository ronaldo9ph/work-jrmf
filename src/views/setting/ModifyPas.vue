<template lang="html">
<div class="openAccountInfo">
  <p class="text-center text-red text-normal padbox">请输入当前支付密码，完成身份验证</p>
  <ul class="item">
    <li>
      <label class="t">当前支付密码</label>
      <input type="password" class="txt" v-model="password"/>
    </li>
  </ul>
  <div class="padbox">
    <input type="button" value="下一步" @click="nextFun()" class="btn btn-red btn-block" />
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    nextFun: async function () {
      var num = /^[0-9]\d*$|^0$/
      if (this.password === '') {
        this.$vux.toast.text('请输入原六位数字交易密码', 'middle')
        return false
      }
      if (this.password.length !== 6 || !num.test(this.password)) {
        this.$vux.toast.text('交易密码必须为六位数字', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/passwords/actions/old-pwd', {'tranPassword': this.password})
      if (res.data.fstat) {
        this.$router.push({path: 'resetpas2/reset2'})
      } else {
        this.$vux.toast.text(res.data.respmsg, 'middle')
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
