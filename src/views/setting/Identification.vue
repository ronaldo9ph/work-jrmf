<template lang="html">
<div class="openAccountInfo">
  <ul class="item">
    <li v-if="hasBindCard">
      <label class="t">姓名</label>
      <input type="text" class="txt" v-model="username" />
    </li>
    <li v-if="hasBindCard">
      <label class="t">身份证号</label>
      <input type="text" class="txt" v-model="identify" />
    </li>
    <li>
      <label class="t">手机号码</label>
      <input type="num" class="txt" v-model="mobileno" readonly :value="mobileno" />
    </li>
    <li class="yzm">
      <label class="t">手机号验证码</label>
      <input type="text" class="txt" v-model="code" />
      <a href="javascript:void(0)" @click="getCode()" :class="isShow == 1?'btn btn-red disabled':'btn btn-red'">
        <span v-if="isShow == 0">获取验证码</span>
        <span v-if="isShow == 1"><countdown slot="value" v-model="time2" :start="start" @on-finish="finish2"></countdown>s</span>
        <span v-if="isShow == 2">重新获取</span>
      </a>
    </li>
  </ul>
  <p class="w text-red text-center text-normal">由于您已通过其它渠道注册过帐号，为了您的账户安全，请进行身份验证。</p>
  <div class="padbox">
    <input type="button" value="下一步" @click="subFun()" class="btn btn-red btn-block" />
  </div>
  <div class="popbg" id="popbg" style="display:none;" v-show="isPop"></div>
  <div class="popwin" id="popwin" style="display:none;" v-show="isPop">
    <div class="con w text-center">
      <p class="suc">恭喜基金开户成功！</p>
      <p class="text-center">为了方便您更好的选择基金产品，请您认真填写风险测评，了解您的风险承受能力。</p>
      <div class="bt clearfix text-center">
        <router-link :to="{ name: 'risktest'}" class="btn btn-red">去测评</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
let tel = /^0?(13|15|18|17|14)[0-9]{9}$/
let chinese = new RegExp('^[\\u4e00-\\u9fa5]+$')
let card = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
import { Group, Cell, Countdown, XSwitch } from 'vux'
export default {
  components: {
    Group,
    Cell,
    Countdown,
    XSwitch
  },
  data () {
    return {
      username: '',
      identify: '',
      mobileno: '',
      code: '',
      isShow: 0,
      value: '',
      start: false,
      time2: 60,
      isPop: false,
      hasBindCard: false
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/logins/actions/checkp2p', {'mobiletelno': this.$route.params.mobileno})
    if (res.data.fstat === 1) {
      this.hasBindCard = res.data.hasBindCard
      this.mobileno = this.$route.params.mobileno
    }
    if (res.data.fstat === 9) {
      this.$vux.toast.text(res.data.respmsg, 'middle')
      return false
    }
  },
  methods: {
    finish2 (index) {
      this.start = false
      this.isShow = 2
      this.time2 = 60
    },
    getCode: async function () {
      if (this.hasBindCard) {
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
      if (this.mobileno === '') {
        this.$vux.toast.text('请填写手机号', 'middle')
        return false
      }
      if (!tel.test(this.mobileno)) {
        this.$vux.toast.text('手机号格式有误', 'middle')
        return false
      }
      const res = await this.$http.post('api/v1/funds/logins/actions/sendCode', {'hasBindCard': this.hasBindCard, 'identityno': this.identify, 'mobiletelno': this.mobileno, 'realname': this.username})
      if (res.data.fstat === 1) {
        this.start = true
        this.isShow = 1
      }
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    },
    subFun: async function () {
      if (this.hasBindCard) {
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
      if (this.mobileno === '') {
        this.$vux.toast.text('请填写手机号', 'middle')
        return false
      }
      if (!tel.test(this.mobileno)) {
        this.$vux.toast.text('手机号格式有误', 'middle')
        return false
      }
      if (this.code === '') {
        this.$vux.toast.text('请输入手机验证码', 'middle')
        return false
      }
      const res = await this.$http.post('api/v1/funds/logins/actions/vili-code', {'hasBindCard': this.hasBindCard, 'identityno': this.identify, 'mobiletelno': this.mobileno, 'realname': this.username, 'customkey': this.$route.params.customkey, 'cust_id': this.$route.params.cust_id, 'phonecode': this.code})
      if (res.data.fstat === 1) {
        window.sessionStorage.setItem('tokens', res.data.token)
        this.$router.push({name: 'fundindex'})
      }
      if (res.data.fstat === 9) {
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
