<template lang="html">
<div class="openAccount">
  <ul class="item">
    <li>
      <label class="t t-1">姓名</label>
      <input type="text" class="txt" v-model="username" :value="username" v-if="hasInfo" readonly />
      <input type="text" class="txt" v-model="username" v-else />
    </li>
    <li>
      <label class="t t-2">身份证号</label>
      <input type="text" class="txt" v-model="identify" :value="identify" v-if="hasInfo" readonly/>
      <input type="text" class="txt" v-model="identify" v-else />
    </li>
    <li class="clearfix">
      <label class="t t-3">职业</label>
      <select class="sel" v-model="job">
        <option value="" disabled selected>请选择</option>
        <option v-for="item in profession" :value="item">{{item}}</option>
      </select>
    </li>
    <li>
      <label class="t t-4">地址</label>
      <input type="text" class="txt" v-model="address" />
    </li>
    <li>
      <label class="t t-5">邮箱</label>
      <input type="text" class="txt" v-model="email" />
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
      username: '',
      identify: '',
      job: '',
      address: '',
      email: '',
      provincelist: [],
      hasInfo: '', // 是否有姓名
      profession: []
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/accounts/actions/search')
    if (res.data.fstat) {
      this.profession = {}
      this.hasInfo = res.data.hasInfo
      this.username = res.data.realName
      this.identify = res.data.identity_code
      for (let prop in res.data.profession) {
        this.profession[prop] = res.data.profession[prop]
      }
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
    }
  },
  methods: {
    subFun: async function () {
      let email = new RegExp('^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$')
      let chinese = new RegExp('^[\\u4e00-\\u9fa5]+$')
      let card = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
      if (!this.hasInfo) {
        if (this.username === '') {
          this.$vux.toast.text('请输入您的真实姓名', 'middle')
          return false
        }
        if (!chinese.test(this.username)) {
          this.$vux.toast.text('姓名只能为中文', 'middle')
          return false
        }
        if (this.identify === '') {
          this.$vux.toast.text('身份证号不能为空', 'middle')
          return false
        }
        if (!card.test(this.identify)) {
          this.$vux.toast.text('身份证号码格式不正确', 'middle')
          return false
        }
      }
      if (this.job === '') {
        this.$vux.toast.text('请选择职业', 'middle')
        return false
      }
      if (this.address === '') {
        this.$vux.toast.text('地址不能为空', 'middle')
        return false
      }
      if (this.email === '') {
        this.$vux.toast.text('邮箱不能为空', 'middle')
        return false
      }
      if (!email.test(this.email)) {
        this.$vux.toast.text('邮箱格式不正确', 'middle')
        return false
      }
      this.$router.push({path: '/openaccountinfo/' + this.username + '/' + this.identify + '/' + this.job + '/' + this.address + '/' + this.email})
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
