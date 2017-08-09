<template lang="html">
<div class="openAccount">
  <ul class="item">
    <li>
      <label class="t t-1">姓名</label>
      <input type="text" class="txt" v-model="username" />
    </li>
    <li>
      <label class="t t-2">身份证号</label>
      <input type="text" class="txt" v-model="identify" />
    </li>
    <li class="clearfix">
      <label class="t t-3">职业</label>
      <select class="sel" v-model="job">
        <option value="" disabled >请选择</option>
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
    <input type="button" value="下一步" @click="subFun" class="btn btn-red btn-block" />
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
      profession: []
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/accounts/actions/search')
    if (res.data.fstat) {
      this.profession = {}
      for (let prop in res.data.profession) {
        this.profession[prop] = res.data.profession[prop]
      }
      // this.provincelist = []
      // let arr = this.provincelist.concat(res.data.provincelist)
      // this.provincelist = arr
    } else {
      this.$vux.toast.text(res.data.respmsg, 'middle')
    }
  },
  methods: {
    subFun: async function () {
    // let email = new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$")
    // let chinese = new RegExp("^[\\u4e00-\\u9fa5]+$")
    // let card = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
    //   if (this.username === '') {
    //     this.$vux.toast.text('请输入您的中文姓名', 'middle')
    //     return false
    //   }
    //   if (!chinese.test(this.username)) {
    //     this.$vux.toast.text('请输入您的中文姓名', 'middle')
    //     return false
    //   }
    //   if (this.identify === '') {
    //     this.$vux.toast.text('请输入您的身份证号', 'middle')
    //     return false
    //   }
    //   if (!card.test(this.identify)) {
    //     this.$vux.toast.text('身份证号格式不正确', 'middle')
    //     return false
    //   }
    //   if (this.job === '') {
    //     this.$vux.toast.text('请选择职业', 'middle')
    //     return false
    //   }
    //   if (this.address === '') {
    //     this.$vux.toast.text('请填写您的地址', 'middle')
    //     return false
    //   }
    //   if (this.email === '') {
    //     this.$vux.toast.text('请输入您的邮箱', 'middle')
    //     return false
    //   }
    //   if (!email.test(this.email)) {
    //     this.$vux.toast.text('邮箱格式不正确', 'middle')
    //     return false
    //   }
    //   const res = await this.$http.get('api/v1/funds/accounts/actions/open?realname'+this.username+'&identityno='+this.identify+'&profession='+this.job+'&address='+address+'&email='this.email)
    //   if (res.data.fstat) {
    //     this.$router.push({path: 'openaccountinfo'})
    //   } else {
    //     this.$vux.toast.text(res.data.respmsg, 'middle')
    //   }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
