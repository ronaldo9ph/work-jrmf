<template lang="html">
  <div class="detal-rule" id="rule">
      <div class="tab">
          <a href="javascript:void(0)" :class="{current:active==0}" @click="loadData(0)">买入规则</a>
          <a href="javascript:void(0)" :class="{current:active==1}" @click="loadData(1)">卖出规则</a>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'traderule',
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
        this.$router.push({path: '/traderule/'+this.$route.params.id+'/'+this.$route.params.code+'/mrgz'})
      } else {
        this.active = 1
        this.$router.push({path: '/traderule/'+this.$route.params.id+'/'+this.$route.params.code+'/mcgz'})
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/style.less';
</style>
