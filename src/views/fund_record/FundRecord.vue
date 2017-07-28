<template lang="html">
  <div class="fund-record">
      <div class="tab clearfix">
          <router-link :to="{name:'fundrecord/info', params: {'id':this.$route.params.id,'code':this.$route.params.code}}">概况</router-link>
          <router-link :to="{name:'fundrecord/notice', params: {'id':this.$route.params.id,'code':this.$route.params.code}}">公告</router-link>
          <router-link :to="{name:'fundrecord/hold', params: {'id':this.$route.params.id,'code':this.$route.params.code}}">持仓</router-link>
          <router-link :to="{name:'fundrecord/type', params: {'id':this.$route.params.id,'code':this.$route.params.code}}">行业</router-link>
          <router-link :to="{name:'fundrecord/fh', params: {'id':this.$route.params.id,'code':this.$route.params.code}}">分红配送</router-link>
      </div>
      <router-view></router-view>
  </div>
</template>

<style lang="less">
@import '../../styles/style.less';
</style>
