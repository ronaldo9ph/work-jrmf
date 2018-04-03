<template lang="html">
  <div class="openAccountInfo">
    <ul class="item">
      <li>
        <label class="t">持卡人身份证号</label>
        <input type="text" class="txt" v-model="identify" />
      </li>
      <li>
        <label class="t">手机号码</label>
        <input type="num" class="txt" readonly :value="tel"/>
      </li>
      <li class="yzm">
        <label class="t">验证码</label>
        <input type="text" class="txt" v-model="code" placeholder="请输入验证码" />
        <a href="javascript:void(0)" @click="getCode()" :class="isShow == 1?'btn btn-red disabled':'btn btn-red'">
          <span v-if="isShow == 0">获取验证码</span>
          <span v-if="isShow == 1"><countdown slot="value" v-model="time2" :start="start" @on-finish="finish2"></countdown>s</span>
          <span v-if="isShow == 2">重新获取</span>
        </a>
      </li>
    </ul>
    <div class="padbox">
      <input type="button" value="下一步" class="btn btn-red btn-block" @click="subFun()" />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { Group, Cell, Countdown, XSwitch } from 'vux'
let card = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
export default {
  components: {
    Group,
    Cell,
    Countdown,
    XSwitch
  },
  data () {
    return {
      tel: '',
      identify: '',
      code: '',
      show: true,
      time2: 60,
      value: '',
      start: false,
      isShow: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      window.sessionStorage.setItem('repasBackUrl', from.fullPath)
    })
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/passwords/actions/mobileno')
    if (res.data.fstat === 1) {
      this.tel = res.data.mobiletelno
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
    getCode: debounce(async function (e) {
      if (this.identify === '') {
        this.$vux.toast.text('请输入持卡人身份证号', 'middle')
        return false
      }
      if (!card.test(this.identify)) {
        this.$vux.toast.text('身份证号格式不正确', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/passwords/actions/check-info', {'identity': this.identify, 'mobiletelno': this.tel})
      if (res.data.fstat === 1) {
        this.start = true
        this.isShow = 1
      }
      if (res.data.fstat === 9) {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    }, 500),
    subFun: debounce(async function (e) {
      if (this.identify === '') {
        this.$vux.toast.text('请输入持卡人身份证号', 'middle')
        return false
      }
      if (!card.test(this.identify)) {
        this.$vux.toast.text('身份证号格式不正确', 'middle')
        return false
      }
      if (this.code === '') {
        this.$vux.toast.text('验证码不能为空', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/passwords/actions/vili-code', {'code': this.code, 'identity': this.identity, 'mobiletelno': this.tel})
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
