<template lang="html">
<ul class="setting">
  <li>
    <router-link :to="{ name: 'bank'}" class="bank">银行卡</router-link>
  </li>
  <li>
    <router-link :to="{ name: 'risktest'}" class="risk">风险测试</router-link>
  </li>
  <li>
    <router-link :to="{ name: 'password'}" class="pas">支付密码</router-link>
  </li>
</ul>
</template>

<style lang="less">
@import '../../styles/setting.less';
</style>
