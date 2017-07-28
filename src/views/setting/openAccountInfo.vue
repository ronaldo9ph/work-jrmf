<template lang="html">
<div class="openAccountInfo">
  <ul class="item">
    <li>
      <label class="t">开户银行</label>
      <select class="sel" name="bank">
        <option value="-1">请选择</option>
        <option value="0">招商银行</option>
      </select>
    </li>
    <li>
      <label class="t">银行卡号</label>
      <input type="text" class="txt" name="bankno" />
    </li>
    <li>
      <label class="t">开卡省/直辖市</label>
      <select class="sel" name="province">
        <option value="-1">请选择</option>
        <option value="0">北京</option>
      </select>
    </li>
    <li>
      <label class="t">开卡市</label>
      <select class="sel" name="city">
        <option value="-1">请选择</option>
      </select>
    </li>
    <li>
      <label class="t">银行预留手机号</label>
      <input type="num" class="txt" name="mobileno" />
    </li>
    <li class="yzm">
      <label class="t">手机号验证码</label>
      <input type="text" class="txt" name="mobileno" />
      <a href="javascript:void(0)" id="getcode" class="btn btn-red">获取验证码</a>
    </li>
    <li>
      <label class="t">支付密码</label>
      <input type="password" class="txt" name="password" />
    </li>
    <li>
      <label class="t">确认支付密码</label>
      <input type="password" class="txt" name="repassword"/>
    </li>
  </ul>
  <p class="w text-gray text-center text-normal">为了简便您的操作，支付密码同时适用于理财和基金。</p>
  <div class="padbox">
    <p class="text-normal text-center"><input type="checkbox" checked class="ck" />己阅读并同意<a href="#" class="text-red">《开户协议》</a>及<a href="#" class="text-red">《投资人权益须知》</a></p>
    <input type="button" value="下一步" class="btn btn-red btn-block" />
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    confirmOrder:function(){

    }
  }
}
</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
