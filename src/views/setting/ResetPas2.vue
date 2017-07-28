<template lang="html">
<div class="openAccountInfo">
  <ul class="item">
    <li>
      <label class="t">新交易密码</label>
      <input type="password" class="txt" name="password" placeholder="密码为六位数字"/>
    </li>
    <li>
      <label class="t">确认交易密码</label>
      <input type="password" class="txt" name="repassword"/>
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
  methods:{
    confirmOrder:function(){

    }
  }
}
</script>

<style lang="less">
@import '../../styles/setting.less';
</style>
