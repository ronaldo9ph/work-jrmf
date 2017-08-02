<template lang="html">
<div class="openAccountInfo">
  <p class="text-center text-red text-normal padbox">请输入当前支付密码，完成身份验证</p>
  <ul class="item">
    <li>
      <label class="t">当前支付密码</label>
      <input type="password" class="txt" name="password"/>
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

    }
  },
  methods: {
    confirmOrder: function () {

    }
  }
}

</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
