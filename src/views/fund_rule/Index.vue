<template lang="html">
  <div class="detal-rule" id="rule">
      <div class="tab">
          <router-link :to="{name:'traderule/mrgz', params: {'id':this.$route.params.id,'code':this.$route.params.code}}">买入规则</router-link>
          <router-link :to="{name:'traderule/mcgz', params: {'id':this.$route.params.id,'code':this.$route.params.code}}">卖出规则</router-link>
      </div>
      <router-view></router-view>
  </div>
</template>

<style lang="less">
@import '../../styles/style.less';
</style>
