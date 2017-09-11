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

<style lang="less">
@import '../../styles/setting.less';
</style>
