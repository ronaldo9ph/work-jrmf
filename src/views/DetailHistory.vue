<template lang="html">
  <div class="detailHistory" id="detailHistory">
      <table class="tb">
          <tr>
              <th>日期</th>
              <th>单位净值</th>
              <th>累计净值</th>
              <th>日涨副</th>
          </tr>
          <tr v-for="item in list">
              <td>{{item.tradedate}}</td>
              <td>{{item.unit_NET}}</td>
              <td>{{item.accum_NET}}</td>
              <td :class="item.unit_NET_CHNG_PCT>=0?'text-red':'text-green'"><span v-if="item.unit_NET_CHNG_PCT>=0">+</span>{{item.unit_NET_CHNG_PCT | discount}}%</td>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
  name: 'detailhistory',
  data () {
    return {
      list: ''
    }
  },
  created: async function () {
    const res = await this.$http.post('/h5fund/fundtrade/detailHistory/return.html', {'fundid': this.$route.params.id, 'innercode': this.$route.params.code})
    if (res.data) {
          this.list = res.data.fundHistoryInfo
    }
  }
}
</script>

<style lang="less">
@import '../styles/style.less';
</style>
