<template lang="html">
<div class="openAccountInfo">
  <ul class="item">
    <li>
      <label class="t">新交易密码</label>
      <input type="password" class="txt" v-model="password" placeholder="密码为六位数字"/>
    </li>
    <li>
      <label class="t">确认交易密码</label>
      <input type="password" class="txt" v-model="repassword"/>
    </li>
  </ul>
  <div class="padbox">
    <input type="button" value="下一步" @click="subFun()" class="btn btn-red btn-block" />
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      repassword: ''
    }
  },
  methods: {
    subFun: async function () {
      let num = /^[0-9]\d*$|^0$/
      if (this.password === '') {
        this.$vux.toast.text('请输入六位数字交易密码', 'middle')
        return false
      }
      if (this.password.length !== 6 || !num.test(this.password)) {
        this.$vux.toast.text('交易密码必须为六位数字', 'middle')
        return false
      }
      if (this.password !== this.repassword) {
        this.$vux.toast.text('两次输入密码不一致', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/passwords/actions/new-pwd', {'tranPassword': this.password})
      if (res.data.fstat) {
        if (this.$route.params.from === 'reset') {
          this.$vux.toast.text('恭喜重置密码成功', 'middle')
        } else {
          this.$vux.toast.text('恭喜修改密码成功', 'middle')
        }
        setTimeout(() => {
          this.$router.push({name: 'myhold'})
        }, 5000)
      } else {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
