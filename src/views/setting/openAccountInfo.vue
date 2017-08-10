<template lang="html">
<div class="openAccountInfo">
  <ul class="item">
    <li>
      <label class="t">开户银行</label>
      <select class="sel" v-model="bank">
        <option value="" disabled selected>请选择</option>
        <option :value="item.bankno" v-for="item in bankList">{{item.bankname}}</option>
      </select>
    </li>
    <li>
      <label class="t">银行卡号</label>
      <input type="text" class="txt" v-model="bankno" />
    </li>
    <li>
      <label class="t">开卡省/直辖市</label>
      <select class="sel" v-model="province" @change="onSelected($event)">
        <option value="" disabled selected>请选择</option>
        <option :value="item.areacode" v-for="item in provincelist">{{item.areaname}}</option>
      </select>
    </li>
    <li>
      <label class="t">开卡市</label>
      <select class="sel" v-model="city">
        <option value="" disabled selected>请选择</option>
        <option :value="item.areacode" v-for="item in arealist">{{item.areaname}}</option>
      </select>
    </li>
    <li>
      <label class="t">银行预留手机号</label>
      <input type="num" class="txt" v-model="mobileno" />
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
    <li v-show="!hasTranPwd" style="display:none">
      <label class="t">支付密码</label>
      <input type="password" class="txt" v-model="password" />
    </li>
    <li v-show="!hasTranPwd" style="display:none">
      <label class="t">确认支付密码</label>
      <input type="password" class="txt" v-model="repassword"/>
    </li>
  </ul>
  <p class="w text-gray text-center text-normal">为了简便您的操作，支付密码同时适用于理财和基金。</p>
  <div class="padbox">
    <p class="text-normal text-center"><input type="checkbox" class="ck" v-model="ck" />己阅读并同意<a href="#" class="text-red">《开户协议》</a>及<a href="#" class="text-red">《投资人权益须知》</a></p>
    <input type="button" value="下一步" @click="subFun()" class="btn btn-red btn-block" />
  </div>
  <div class="popbg" id="popbg" style="display:none;" v-show="isPop"></div>
  <div class="popwin" id="popwin" style="display:none;" v-show="isPop">
    <div class="con w text-center">
      <p class="suc">恭喜基金开户成功！</p>
      <p class="text-left">为了方便您更好的选择基金产品，请您认真填写风险测评，了解您的风险承受能力。</p>
      <div class="bt clearfix">
        <a href="javascript:void(0)" @click="closePopwin()" class="btn btn-white pull-left">取消</a>
        <router-link :to="{ name: 'risktest', params: {} }" class="btn btn-red pull-right">去测评</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
let bankreg = /^[0-9]{16,19}$/
let tel = /^0?(13|15|18|17|14)[0-9]{9}$/
let num = /^[0-9]\d*$|^0$/
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
      job: '',
      address: '',
      email: '',
      bank: '', // 银行编号
      bankno: '', // 银行卡号
      province: '', // 省编号
      city: '', // 市编号
      mobileno: '',
      code: '',
      password: '',
      repassword: '',
      ck: true, // 条款选中状态
      bankList: [], // 银行列表
      hasTranPwd: true, // 是否有支付密码
      provincelist: [], // 省
      arealist: [], // 市
      isShow: 0,
      value: '',
      start: false,
      time2: 60,
      isPop: false
    }
  },
  created: async function () {
    const res = await this.$http.get('api/v1/funds/accounts/actions/search')
    if (res.data.fstat) {
      this.bankList = []
      this.hasTranPwd = res.data.hasTranPwd
      let arr = this.bankList.concat(res.data.bankList)
      this.bankList = arr
      this.provincelist = []
      let arrprovincelist = this.provincelist.concat(res.data.provincelist)
      this.provincelist = arrprovincelist
    }
  },
  methods: {
    finish2 (index) {
      this.start = false
      this.isShow = 2
      this.time2 = 60
    },
    getCode: async function () {
      if (this.bank === '') {
        this.$vux.toast.text('请选择开户行', 'middle')
        return false
      }
      if (this.bankno === '') {
        this.$vux.toast.text('请输入银行卡号', 'middle')
        return false
      }
      if (!bankreg.test(this.bankno)) {
        this.$vux.toast.text('银行卡号格式有误', 'middle')
        return false
      }
      if (this.province === '' || this.city === '') {
        this.$vux.toast.text('请选择省市', 'middle')
        return false
      }
      if (this.mobileno === '') {
        this.$vux.toast.text('请填写银行预留手机号', 'middle')
        return false
      }
      if (!tel.test(this.mobileno)) {
        this.$vux.toast.text('手机号格式有误', 'middle')
        return false
      }
      const res = await this.$http.post('api/v1/funds/accounts/actions/sendcode', {'bankno': this.bank, 'depositacct': this.bankno, 'identityno': this.$route.params.identify, 'mobiletelno': this.mobileno, 'realname': this.$route.params.username})
      if (res.data.fstat) {
        this.start = true
        this.isShow = 1
      } else {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    },
    onSelected: async function (event) {
      let id = parseInt(event.target.value)
      const res = await this.$http.get('api/v1/funds/cities/' + id)
      if (res.data.fstat) {
        this.arealist = []
        let arealist = this.arealist.concat(res.data.arealist)
        this.arealist = arealist
      } else {
        this.$vux.toast.text(res.data.respmsg, 'middle')
        return false
      }
    },
    closePopwin: function () {
      this.isPop = false
    },
    subFun: async function () {
      if (this.bank === '') {
        this.$vux.toast.text('请选择开户行', 'middle')
        return false
      }
      if (this.bankno === '') {
        this.$vux.toast.text('请输入银行卡号', 'middle')
        return false
      }
      if (!bankreg.test(this.bankno)) {
        this.$vux.toast.text('银行卡号格式有误', 'middle')
        return false
      }
      if (this.province === '' || this.city === '') {
        this.$vux.toast.text('请选择省市', 'middle')
        return false
      }
      if (this.mobileno === '') {
        this.$vux.toast.text('请填写银行预留手机号', 'middle')
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
      if (!this.hasTranPwd) {
        if (this.password === '') {
          this.$vux.toast.text('请输入六位数字支付密码', 'middle')
          return false
        }
        if (this.password.length !== 6 || !num.test(this.password)) {
          this.$vux.toast.text('支付密码必须为六位数字', 'middle')
          return false
        }
        if (this.password !== this.repassword) {
          this.$vux.toast.text('两次输入密码不一致', 'middle')
          return false
        }
      }
      if (!this.ck) {
        this.$vux.toast.text('请阅读并同意《开户协议》及《投资人权益须知》', 'middle')
        return false
      }
      const res = await this.$http.get('api/v1/funds/accounts/actions/open', { 'address': this.address, 'bankcardno': this.bankno, 'bankno': this.bank, 'citycode': this.city, 'crmpassword': this.repassword, 'email': this.$route.params.email, 'identityno': this.$route.params.identify, 'mobileno': this.mobileno, 'password': this.password, 'phonecode': this.code, 'profession': this.$route.params.job, 'provincecode': this.province, 'realname': this.$route.params.username })
      if (res.data.fstat) {
        this.isPop = true
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
