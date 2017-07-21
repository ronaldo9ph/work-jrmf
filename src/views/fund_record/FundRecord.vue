<template lang="html">
  <div class="fund-record" id="fund-record">
      <div class="tab clearfix">
          <a href="javascript:void(0)" id="info" :class="{current:active==0}" @click="loadData(0)">概况</a>
          <a href="javascript:void(0)" id="notice" :class="{current:active==1}" @click="loadData(1)">公告</a>
          <a href="javascript:void(0)" id="hold" :class="{current:active==2}" @click="loadData(2)">持仓</a>
          <a href="javascript:void(0)" id="type" :class="{current:active==3}" @click="loadData(3)">行业</a>
          <a href="javascript:void(0)" id="fh" :class="{current:active==4}" @click="loadData(4)">分红配送</a>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'fundrecord',
  data () {
    return {
      active: 0
    }
  },
  methods: {
    loadData: function (id) {
      var i = id
      if (id == 0) {
        this.active = 0
        this.$router.push({name: 'fundrecord/info'})
      } else if (id == 1) {
        this.active = 1
        this.$router.push({name: 'fundrecord/notice'})
      } else if (id == 2) {
        this.active = 2
        this.$router.push({name: 'fundrecord/hold'})
      } else if (id == 3) {
        this.active = 3
        this.$router.push({name: 'fundrecord/type'})
      } else {
        this.active = 4
        this.$router.push({name: 'fundrecord/fh'})
      }
    }
  }
}

</script>

<style lang="less">
@import '../../styles/style.less';
</style>
