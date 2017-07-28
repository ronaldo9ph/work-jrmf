<template lang="html">
<ul class="pasPage">
  <li>
    <router-link :to="{ name: 'resetpas'}">重置支付密码</router-link>
  </li>
  <li>
    <router-link :to="{ name: 'modifypas'}">修改支付密码</router-link>
  </li>
</ul>
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
