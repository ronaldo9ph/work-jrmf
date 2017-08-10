<template lang="html">
<div class="chargelist">
  <div class="tab clearfix">
    <router-link :to="{name:'chargelist/ing'}">进行中的交易</router-link>
    <router-link :to="{name:'chargelist/history'}">历史交易</router-link>
  </div>
  <router-view></router-view>
</div>
</template>

<style lang="less">
@import '../../styles/index.less';
</style>
