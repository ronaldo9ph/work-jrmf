<template lang="html">
  <div class="errPage">
    <div class="top text-center">
      <img src="../../assets/error.png" width="50%"/>
      <p>您访问的页面出错了</p>
    </div>
    <div class="reason">
      <p>{{respmsg}}</p>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      respmsg: ''
    }
  },
  created: function () {
    this.respmsg = window.sessionStorage.getItem('respmsg')
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
body{background-color: white;}
</style>
