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
import debounce from 'lodash.debounce'
export default {
  data () {
    return {
      password: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.sessionStorage.setItem('repasBackUrl', from.fullPath)
    })
  },
  methods: {
    nextFun: debounce(async function (e) {
      var num = /^[0-9]\d*$|^0$/
      if (this.password === '') {
        this.$vux.toast.text('请输入原六位数字支付密码', 'middle')
        return false
      }
      if (this.password.length !== 6 || !num.test(this.password)) {
        this.$vux.toast.text('支付密码必须为六位数字', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/passwords/actions/old-pwd', {'tranPassword': this.password})
      if (res.data.fstat === 1) {
        this.$router.push({path: 'resetpas2/reset'})
      }
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    }, 500)
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
