<template lang="html">
<div class="openAccount">
  <ul class="item">
    <li>
      <label class="t t-1">姓名</label>
      <input type="text" class="txt" />
    </li>
    <li>
      <label class="t t-2">身份证号</label>
      <input type="text" class="txt" />
    </li>
    <li class="clearfix">
      <label class="t t-3">职业</label>
      <select class="sel" name="job">
        <option value="-1">请选择</option>
        <option value="0">公司职员</option>
        <option value="1">公司高管</option>
      </select>
    </li>
    <li>
      <label class="t t-4">地址</label>
      <input type="text" class="txt" />
    </li>
    <li>
      <label class="t t-5">邮箱</label>
      <input type="text" class="txt" />
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
