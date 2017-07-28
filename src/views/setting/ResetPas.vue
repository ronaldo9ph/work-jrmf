<template lang="html">
  <div class="openAccountInfo">
    <ul class="item">
      <li>
        <label class="t">持卡人身份证号</label>
        <input type="text" class="txt" name="identify" />
      </li>
      <li>
        <label class="t">手机号码</label>
        <input type="num" class="txt" name="mobileno" />
      </li>
      <li class="yzm">
        <label class="t">验证码</label>
        <input type="text" class="txt" name="code" placeholder="请输入验证码" />
        <a href="javascript:void(0)" id="getcode" class="btn btn-red">发送验证码</a>
      </li>
    </ul>
    <div class="padbox">
      <input type="button" value="下一步" class="btn btn-red btn-block" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bank:''
    }
  },
  created: async function () {
    const res = await this.$http.post('')
    if (res) {

    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
