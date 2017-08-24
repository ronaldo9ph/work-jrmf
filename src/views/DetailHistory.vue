<template lang="html">
  <div class="detailHistory">
      <table class="tb" v-if="list" cellspacing="0" cellpadding="0">
          <tr>
              <th>日期</th>
              <th>单位净值</th>
              <th>累计净值</th>
              <th>日涨幅</th>
          </tr>
          <tr v-for="item in list">
              <td>{{item.tradedate}}</td>
              <td>{{item.unit_NET}}</td>
              <td>{{item.accum_NET}}</td>
              <td :class="item.unit_NET_CHNG_PCT>=0?'text-red':'text-green'"><span v-if="item.unit_NET_CHNG_PCT>=0">+</span>{{item.unit_NET_CHNG_PCT | discount}}%</td>
          </tr>
      </table>
      <div class="padbox text-center text-gray" v-else>暂无数据！</div>
      <div class="padbox text-center" v-if="hasNext">
          <a href="javascript:void(0)" class="more text-gray" @click="loadData">点击加载更多&gt;&gt;</a>
      </div>
      <div class="padbox text-center text-gray" v-if="loading">正在努力加载中...</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      hasNext: false,
      pageSize: 20,
      pageIndex: 1,
      loading: false
    }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    loadData: async function () {
      this.loading = true
      const res = await this.$http.get('api/v1/funds/' + this.$route.params.id + '/fund-navcalcs/histories', {'page_size': this.pageSize, 'page_index': this.pageIndex})
      if (res.data.fstat) {
        if (this.pageIndex === 1) {
          this.list = []
        }
        for (var i = 0; i < res.data.fundHistoryInfo.length; i++) {
          this.list.push(res.data.fundHistoryInfo[i])
        }
        this.hasNext = res.data.hasNext
        this.pageIndex++
      }
      this.loading = false
    }
  }
}

</script>

<style lang="less">
@import '../styles/style.less';
</style>
